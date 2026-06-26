import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private readonly authService = inject(AuthService);

  private readonly router = inject(Router);

  email = '';

  password = '';

  errorMessage = '';

  login() {

    this.errorMessage = '';

    this.authService.login(
      this.email,
      this.password
    ).subscribe({

      next: () => {

        this.router.navigate([
          '/dashboard'
        ]);

      },

      error: () => {

        this.errorMessage =
          'Correo o contraseña incorrectos.';

      }

    });

  }

}