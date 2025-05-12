import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private mockUser: User = {
    id: 1,
    username: 'admin',
    email: 'admin@example.com',
    role: 'admin'
  };

  constructor() { }

  login(username: string, password: string): Observable<{ user: User; token: string }> {
    // In a real app, this would make an HTTP request to your backend
    // For now, we'll just simulate a successful login
    if (username === 'admin' && password === 'admin') {
      const token = 'mock-jwt-token';
      localStorage.setItem('auth_token', token);
      // localStorage.setItem('user', JSON.stringify(this.mockUser));
      localStorage.setItem('user', JSON.stringify(this.mockUser));
      return of({ user: this.mockUser, token });
    }
    throw new Error('Invalid credentials');
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
}
