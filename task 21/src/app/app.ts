import { Component, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from './product.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  products: Product[] = [
    { id: 1, name: 'Wireless Headphones', price: 99 },
    { id: 2, name: 'Smart Fitness Watch', price: 149 },
    { id: 3, name: 'Mechanical Keyboard', price: 79 },
    { id: 4, name: 'Ergonomic Gaming Mouse', price: 49 },
    { id: 5, name: 'USB-C Portable Hub', price: 35 }
  ];

  cart = signal<Product[]>([]);

  totalPrice = computed(() =>
    this.cart().reduce((sum, product) => sum + product.price, 0)
  );

  constructor() {
    effect(() => {
      console.log(`Cart items count: ${this.cart().length}`);
    });
  }

  addToCart(product: Product): void {
    this.cart.update(items => [...items, product]);
  }

  removeFromCart(index: number): void {
    this.cart.update(items => items.filter((_, i) => i !== index));
  }

  clearCart(): void {
    this.cart.set([]);
  }
}
