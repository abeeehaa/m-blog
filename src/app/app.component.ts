import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <app-header [links]="headerLinks"></app-header>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  headerLinks = [
    { label: 'Home', path: '/' },
    { label: 'Admin', path: '/admin' },
    { label: 'Login', path: '/auth/login' },
    { label: 'Items', path: '/items' },
    { label: 'Cart', path: '/cart' }
  ];
}
