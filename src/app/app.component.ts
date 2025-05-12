import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  template: `
    <app-header></app-header>
    <main class="min-h-screen bg-gray-50">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: []
})
export class AppComponent {
  title = 'm-blog';
}
