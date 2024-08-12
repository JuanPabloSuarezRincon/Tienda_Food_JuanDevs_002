import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  role: string = 'client'; // Valor predeterminado
  errorMessage: string | null = null;

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit() {
    if (
      this.authService.authenticate(this.username, this.password, this.role)
    ) {
      if (this.role === 'client') {
        this.router.navigate(['/customer']); // Redirigir a la vista del cliente
      } else {
        this.router.navigate(['/employee']); // Redirigir a la vista del empleado
      }
      this.errorMessage = null;
    } else {
      this.errorMessage = 'Usuario, contraseña o rol incorrectos';
    }
  }
}
