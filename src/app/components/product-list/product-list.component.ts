import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products: CartItem[] = [
    {
      id: 1,
      name: 'Product 1',
      price: 99.99,
      quantity: 1,
      image: 'https://picsum.photos/200/300?random=1'
    },
    {
      id: 2,
      name: 'Product 2',
      price: 149.99,
      quantity: 1,
      image: 'https://picsum.photos/200/300?random=2'
    },
    {
      id: 3,
      name: 'Product 3',
      price: 199.99,
      quantity: 1,
      image: 'https://picsum.photos/200/300?random=3'
    },
    {
      id: 4,
      name: 'Product 4',
      price: 79.99,
      quantity: 1,
      image: 'https://picsum.photos/200/300?random=4'
    },
    {
      id: 5,
      name: 'Product 5',
      price: 129.99,
      quantity: 1,
      image: 'https://picsum.photos/200/300?random=5'
    },
    {
      id: 6,
      name: 'Product 6',
      price: 89.99,
      quantity: 1,
      image: 'https://picsum.photos/200/300?random=6'
    }
  ];

  cartItems;

  constructor(private cartService: CartService) {
    this.cartItems = this.cartService.getCartItems();
  }

  addToCart(product: CartItem) {
    this.cartService.addToCart(product);
  }

  getQuantity(productId: number): number {
    const item = this.cartItems().find(i => i.id === productId);
    return item ? item.quantity : 0;
  }

  updateQuantity(productId: number, quantity: number) {
    if (quantity > 0) {
      this.cartService.updateQuantity(productId, quantity);
    } else {
      this.cartService.removeFromCart(productId);
    }
  }
} 