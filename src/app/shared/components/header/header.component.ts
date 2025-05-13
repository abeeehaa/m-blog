import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { input, output } from '@angular/core';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="app-header">
      <nav class="container header-nav">
        <a routerLink="/" class="logo">M-Blog</a>
        <ul class="nav-links">
          @for (link of links(); track link.path) {
            <!-- <li (click)="clickOutput.emit(link.path)">test</li> -->
            <li><a routerLink="{{ link.path }}" routerLinkActive="active">{{ link.label }}</a></li>
          }
        </ul>
      </nav>
    </header>
  `,
  styles: [`
    .cart-badge {
      position: absolute;
      top: -8px;
      right: -16px;
      background: #e53e3e;
      color: #fff;
      border-radius: 9999px;
      padding: 2px 8px;
      font-size: 0.75rem;
      font-weight: bold;
      line-height: 1;
    }
  `]
})
export class HeaderComponent {

  links = input.required<{ label: string, path: string }[]>();
  // clickOutput = output<string>();

  constructor(private cartService: CartService) {}

  cartItemCount = computed(() =>
    this.cartService.getCartItems()().reduce((sum: number, item: any) => sum + item.quantity, 0)
  );

} 