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
  identifier: string = ''; // Zmieniono "email" na "identifier"
  password: string = '';
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private metaService: Meta,
    private authService: AuthService,
    private router: Router
  ) {}

  toggleRememberMe(): void {
    this.rememberMe = !this.rememberMe;
  }

  ngOnInit(): void {
    this.metaService.updateTag({name: 'theme-color', content: '#fff'});
    window.scrollTo(0, 0);
  }

  onSubmit(): void {
    this.errorMessage = null;
    this.successMessage = null;
    this.authService.signin(this.identifier, this.password).subscribe({
      next: (response) => {
        console.log('Odpowiedź z backendu:', response); // Dodaj log
        if (this.rememberMe) {
          localStorage.setItem('token', response.token);
          console.log('Zapisano token w localStorage:', response.token);
        } else {
          sessionStorage.setItem('token', response.token);
          console.log('Zapisano token w sessionStorage:', response.token);
        }
        this.successMessage = 'Zalogowano pomyślnie!';
        setTimeout(() => {
          this.router.navigate(['/tab-navigator']);
        }, 2000);
      },
      error: (error) => {
        this.errorMessage = error.error.error || 'Błąd logowania';
        console.error('Błąd logowania', error);
      },
    });
  }
}
