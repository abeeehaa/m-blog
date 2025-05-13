import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  private _cartService: CartService;
  cartItems;
  cartTotal;

  constructor(cartService: CartService) {
    this._cartService = cartService;
    this.cartItems = this._cartService.getCartItems();
    this.cartTotal = this._cartService.getCartTotal();
  }

  ngOnInit(): void {}

  updateQuantity(itemId: number, quantity: number) {
    if (quantity > 0) {
      this._cartService.updateQuantity(itemId, quantity);
    }
  }

  removeFromCart(itemId: number) {
    this._cartService.removeFromCart(itemId);
  }

  clearCart() {
    this._cartService.clearCart();
  }
} 