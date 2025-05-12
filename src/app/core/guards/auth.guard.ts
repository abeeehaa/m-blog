import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard = () => {
  const router = inject(Router);
  
  // For now, we'll just check if there's a token in localStorage
  // In a real app, you'd want to validate this token with your backend
  const token = localStorage.getItem('auth_token');
  
  if (token) {
    return true;
  }
  
  // Redirect to login page
  return router.parseUrl('/auth/login');
}; 