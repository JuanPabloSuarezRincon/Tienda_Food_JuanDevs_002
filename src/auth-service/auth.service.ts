import { Injectable } from '@angular/core';

interface User {
  username: string;
  password: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private users: User[] = []; // Array para almacenar usuarios registrados

  constructor() {
    this.loadUsers(); // Cargar usuarios desde localStorage al iniciar
  }

  register(username: string, password: string, role: string) {
    const user: User = { username, password, role };
    this.users.push(user); // Agregar usuario al array
    this.saveUsers(); // Guardar usuarios en localStorage
    console.log('Usuario registrado:', user);
  }

  authenticate(username: string, password: string, role: string): boolean {
    const userFound = this.users.find(
      (user) =>
        user.username === username &&
        user.password === password &&
        user.role === role
    );
    console.log('Intento de autenticación:', { username, role });
    console.log('Usuario encontrado:', userFound);
    return userFound !== undefined;
  }

  saveUsers() {
    localStorage.setItem('users', JSON.stringify(this.users)); // Guardar usuarios en localStorage
  }

  loadUsers() {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers); // Cargar usuarios desde localStorage
    }
  }
}
