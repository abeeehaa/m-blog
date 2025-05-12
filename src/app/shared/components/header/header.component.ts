import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="app-header">
      <nav class="container header-nav">
        <a routerLink="/" class="logo">M-Blog</a>
        <ul class="nav-links">
          <li><a routerLink="/" routerLinkActive="active">Home</a></li>
          <li><a routerLink="/admin" routerLinkActive="active">Dashboard</a></li>
          <li><a routerLink="/auth/login" routerLinkActive="active">Login</a></li>
        </ul>
      </nav>
    </header>
  `,
  // styles: [`
  //   .app-header {
  //     position: sticky;
  //     top: 0;
  //     width: 100%;
  //     background: $card-bg;
  //     border-bottom: 1px solid $border-color;
  //     z-index: 100;
  //     box-shadow: 0 2px 6px rgba(0,0,0,0.03);
  //   }
  //   .header-nav {
  //     display: flex;
  //     align-items: center;
  //     justify-content: space-between;
  //     min-height: 64px;
  //     padding: 0 $container-padding;
  //   }
  //   .logo {
  //     font-size: 2rem;
  //     font-weight: 700;
  //     color: $primary-color;
  //     text-decoration: none;
  //     letter-spacing: 1px;
  //     transition: color 0.2s;
  //   }
  //   .logo:hover, .logo:focus {
  //     color: $accent-color;
  //   }
  //   .nav-links {
  //     display: flex;
  //     gap: $spacing-lg;
  //     list-style: none;
  //     margin: 0;
  //     padding: 0;
  //   }
  //   .nav-links li a {
  //     color: $text-color;
  //     text-decoration: none;
  //     font-weight: 500;
  //     font-size: 1rem;
  //     padding: $spacing-xs $spacing-sm;
  //     border-radius: $border-radius;
  //     transition: background 0.2s, color 0.2s;
  //   }
  //   .nav-links li a:hover, .nav-links li a:focus, .nav-links li a.active {
  //     background: $accent-color;
  //     color: #fff;
  //   }
  //   @media (max-width: 768px) {
  //     .header-nav {
  //       flex-direction: column;
  //       align-items: flex-start;
  //       padding: $spacing-sm $container-padding;
  //     }
  //     .nav-links {
  //       gap: $spacing-md;
  //     }
  //     .logo {
  //       font-size: 1.5rem;
  //     }
  //   }
  // `]
})
export class HeaderComponent {} 