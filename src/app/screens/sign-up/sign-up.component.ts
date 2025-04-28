import {Component, OnInit} from '@angular/core';
import {RouterLink, Router} from '@angular/router';
import {Meta} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from '../../components/header/header.component';
import {ButtonComponent} from '../../components/button/button.component';
import {InputFieldComponent} from '../../components/input-field/input-field.component';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    HeaderComponent,
    ButtonComponent,
    InputFieldComponent,
    RouterLink,
    FormsModule,
    HttpClientModule,
    CommonModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent implements OnInit {
  name: string = '';
  lastname: string = ''; // Dodaj pole lastname
  email: string = '';
  nickname: string = ''; // Dodaj pole nickname
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string | null = null;

  constructor(
    private metaService: Meta,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.metaService.updateTag({name: 'theme-color', content: '#fff'});
    window.scrollTo(0, 0);
  }

  onSubmit(): void {
    console.log('Dane formularza:', {
      name: this.name,
      lastname: this.lastname,
      email: this.email,
      nickname: this.nickname,
      password: this.password,
      confirmPassword: this.confirmPassword,
    });
    this.errorMessage = null;
    this.authService
      .signup(
        this.name,
        this.lastname,
        this.email,
        this.nickname,
        this.password,
        this.confirmPassword
      )
      .subscribe({
        next: (response) => {
          console.log('Rejestracja udana', response);
          this.router.navigate(['/sign-up-account-created']);
        },
        error: (error) => {
          this.errorMessage = error.error.error || 'Błąd rejestracji';
          console.error('Błąd rejestracji', error);
        },
      });
  }
}
