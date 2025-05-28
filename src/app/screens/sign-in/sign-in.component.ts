import {Component, OnInit} from '@angular/core';
import {RouterLink, Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {Meta} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {HeaderComponent} from '../../components/header/header.component';
import {ButtonComponent} from '../../components/button/button.component';
import {InputFieldComponent} from '../../components/input-field/input-field.component';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    HeaderComponent,
    InputFieldComponent,
    ButtonComponent,
    RouterLink,
    CommonModule,
    FormsModule,
    HttpClientModule,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent implements OnInit {
  rememberMe: boolean = false;
  identifier: string = '';
  password: string = '';
  errorMessage: string | null = null;
  successMessage: string | null = null;
  isLoading: boolean = false;

  constructor(
    private metaService: Meta,
    private authService: AuthService,
    private router: Router
  ) {}

  toggleRememberMe(): void {
    this.rememberMe = !this.rememberMe;
    console.log('Opcja Zapamiętaj mnie:', this.rememberMe);
  }

  ngOnInit(): void {
    this.metaService.updateTag({name: 'theme-color', content: '#fff'});
    window.scrollTo(0, 0);
    // Sprawdź, czy użytkownik jest już zalogowany
    const token =
      localStorage.getItem('auth_token') ||
      sessionStorage.getItem('auth_token');
    if (token && this.authService.getCurrentUser()) {
      console.log('Użytkownik już zalogowany, token:', token);
      this.router.navigate(['/tab-navigator']);
    } else {
      console.log('Brak zalogowanego użytkownika lub tokena');
    }
  }

  onSubmit(): void {
    // Reset komunikatów i ustawienie stanu ładowania
    this.errorMessage = null;
    this.successMessage = null;
    this.isLoading = true;

    // Walidacja danych wejściowych
    if (!this.identifier.trim() || !this.password) {
      this.errorMessage = 'Proszę wprowadzić identyfikator i hasło';
      this.isLoading = false;
      console.warn('Brak identyfikatora lub hasła:', {
        identifier: this.identifier,
        password: this.password,
      });
      return;
    }

    // Wywołanie metody signin z AuthService
    this.authService
      .signin(this.identifier.trim(), this.password, this.rememberMe)
      .subscribe({
        next: (response) => {
          console.log('Odpowiedź z backendu:', response);
          // Sprawdzenie, czy odpowiedź zawiera token i refreshToken
          if (response.token && response.refreshToken) {
            // Zapisywanie tokena i refreshTokena
            if (this.rememberMe) {
              localStorage.setItem('auth_token', response.token);
              localStorage.setItem('refresh_token', response.refreshToken);
              console.log('Zapisano w localStorage:', {
                auth_token: response.token,
                refresh_token: response.refreshToken,
              });
            } else {
              sessionStorage.setItem('auth_token', response.token);
              sessionStorage.setItem('refresh_token', response.refreshToken);
              console.log('Zapisano w sessionStorage:', {
                auth_token: response.token,
                refresh_token: response.refreshToken,
              });
            }
            // Weryfikacja zapisania tokena
            const savedToken =
              localStorage.getItem('auth_token') ||
              sessionStorage.getItem('auth_token');
            const savedRefreshToken =
              localStorage.getItem('refresh_token') ||
              sessionStorage.getItem('refresh_token');
            if (!savedToken || !savedRefreshToken) {
              this.errorMessage = 'Błąd zapisu tokenów w przeglądarce';
              this.isLoading = false;
              console.error('Tokeny nie zostały zapisane:', {
                token: response.token,
                refreshToken: response.refreshToken,
              });
              return;
            }
            this.successMessage = 'Zalogowano pomyślnie!';
            setTimeout(() => {
              this.isLoading = false;
              console.log('Przekierowanie do /tab-navigator');
              this.router.navigate(['/tab-navigator']);
            }, 2000);
          } else {
            this.errorMessage =
              'Brak tokena lub refresh tokena w odpowiedzi serwera';
            this.isLoading = false;
            console.error('Brak tokena/refreshTokena w odpowiedzi:', response);
          }
        },
        error: (error) => {
          const errorMsg =
            error.error?.error || 'Błąd logowania. Spróbuj ponownie.';
          this.errorMessage = errorMsg;
          this.isLoading = false;
          console.error('Błąd logowania:', {
            status: error.status,
            message: errorMsg,
            details: error,
          });
        },
      });
  }
}
