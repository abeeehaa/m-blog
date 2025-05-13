import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly CART_STORAGE_KEY = 'cart_items';
  private cartItems = signal<CartItem[]>([]);
  private cartTotal = signal<number>(0);

  constructor() {
    // Initialize cart from localStorage
    this.loadCartFromStorage();
    
    // Listen for storage events from other tabs
    window.addEventListener('storage', (event) => {
      if (event.key === this.CART_STORAGE_KEY) {
        this.loadCartFromStorage();
      }
    });
  }

  private loadCartFromStorage() {
    const storedCart = localStorage.getItem(this.CART_STORAGE_KEY);
    if (storedCart) {
      this.cartItems.set(JSON.parse(storedCart));
      this.updateCartTotal();
    }
  }

  private saveCartToStorage() {
    localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(this.cartItems()));
  }

  private updateCartTotal() {
    const total = this.cartItems().reduce((sum, item) => sum + (item.price * item.quantity), 0);
    this.cartTotal.set(total);
  }

  getCartItems() {
    return this.cartItems;
  }

  getCartTotal() {
    return this.cartTotal;
  }

  addToCart(item: CartItem) {
    const currentItems = this.cartItems();
    const existingItem = currentItems.find(i => i.id === item.id);

    if (existingItem) {
      existingItem.quantity += 1;
      this.cartItems.set([...currentItems]);
    } else {
      this.cartItems.set([...currentItems, { ...item, quantity: 1 }]);
    }

    this.updateCartTotal();
    this.saveCartToStorage();
  }

  removeFromCart(itemId: number) {
    const currentItems = this.cartItems();
    const updatedItems = currentItems.filter(item => item.id !== itemId);
    this.cartItems.set(updatedItems);
    this.updateCartTotal();
    this.saveCartToStorage();
  }

  updateQuantity(itemId: number, quantity: number) {
    const currentItems = this.cartItems();
    const updatedItems = currentItems.map(item => {
      if (item.id === itemId) {
        return { ...item, quantity };
      }
      return item;
    });
    this.cartItems.set(updatedItems);
    this.updateCartTotal();
    this.saveCartToStorage();
  }

  clearCart() {
    this.cartItems.set([]);
    this.updateCartTotal();
    this.saveCartToStorage();
  }
} 