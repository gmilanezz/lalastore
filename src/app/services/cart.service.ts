import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../models/cart.model';
import { Product } from '../models/product.model';

const CART_STORAGE_KEY = 'lalastorevip_cart';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly cartSubject = new BehaviorSubject<CartItem[]>(this.loadCart());
  readonly cart$: Observable<CartItem[]> = this.cartSubject.asObservable();

  get items(): CartItem[] {
    return this.cartSubject.value;
  }

  get totalItems(): number {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  get totalPrice(): number {
    return this.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  addToCart(product: Product, selectedColor?: string, selectedSize?: string): void {
    const cart = [...this.items];
    const existingItem = cart.find(
      (item) => item.product.id === product.id && item.selectedColor === selectedColor && item.selectedSize === selectedSize
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ product, quantity: 1, selectedColor, selectedSize });
    }

    this.saveCart(cart);
  }

  updateQuantity(index: number, quantity: number): void {
    const cart = [...this.items];

    if (!cart[index]) {
      return;
    }

    if (quantity <= 0) {
      cart.splice(index, 1);
    } else {
      cart[index] = { ...cart[index], quantity };
    }

    this.saveCart(cart);
  }

  removeItem(index: number): void {
    const cart = [...this.items];
    cart.splice(index, 1);
    this.saveCart(cart);
  }

  clearCart(): void {
    this.saveCart([]);
  }

  private loadCart(): CartItem[] {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);

    if (!storedCart) {
      return [];
    }

    try {
      return JSON.parse(storedCart) as CartItem[];
    } catch {
      return [];
    }
  }

  private saveCart(cart: CartItem[]): void {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    this.cartSubject.next(cart);
  }
}
