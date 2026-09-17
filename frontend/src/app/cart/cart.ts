import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Cart } from '../models/ecommerce.models';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class CartComponent implements OnInit {
  private cartService = inject(CartService);
  private router = inject(Router);

  cart = signal<Cart | null>(null);
  isLoading = signal<boolean>(true);
  errorMessage = signal<string>('');

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.cartService.getCart().subscribe({
      next: (data) => {
        this.cart.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set(err.message || 'Failed to load cart');
        this.isLoading.set(false);
      }
    });
  }

  changeQuantity(productId: string, currentQty: number, change: number): void {
    const newQty = currentQty + change;
    if (newQty < 1) return;

    this.cartService.updateQuantity(productId, newQty).subscribe({
      next: (updatedCart) => {
        this.cart.set(updatedCart);
      },
      error: (err) => {
        alert(err.message || 'Could not update quantity');
      }
    });
  }

  removeItem(productId: string): void {
    if (!confirm('Are you sure you want to remove this item from your cart?')) return;

    this.cartService.removeItem(productId).subscribe({
      next: (updatedCart) => {
        this.cart.set(updatedCart);
      },
      error: (err) => {
        alert(err.message || 'Could not remove item');
      }
    });
  }

  clearCart(): void {
    if (!confirm('Are you sure you want to clear your shopping cart?')) return;

    this.cartService.clearCart().subscribe({
      next: () => {
        this.cart.set(null);
      },
      error: (err) => {
        alert(err.message || 'Could not clear cart');
      }
    });
  }

  proceedToCheckout(): void {
    this.router.navigateByUrl('/checkout');
  }

  getImageUrl(imagePath?: string): string {
    if (!imagePath) return 'assets/placeholder.png';
    if (imagePath.startsWith('http')) return imagePath;
    return `http://localhost:5000${imagePath}`;
  }
}
