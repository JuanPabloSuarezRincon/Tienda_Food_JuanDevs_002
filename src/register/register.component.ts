import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  role: string = 'client'; // Valor predeterminado
  errorMessage: string | null = null;

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit() {
    if (this.username && this.password) {
      this.authService.register(this.username, this.password, this.role);
      this.router.navigate(['/']); // Redirigir al login después de registrar
    } else {
      this.errorMessage = 'Por favor, complete todos los campos.';
    }
  }
}
