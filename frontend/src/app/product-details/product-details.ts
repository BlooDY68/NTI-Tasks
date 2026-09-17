import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product } from '../models/ecommerce.models';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-product-details',
  imports: [RouterLink],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private authService = inject(AuthService);

  productId = signal<string>('');
  product = signal<Product | null>(null);
  quantity = signal<number>(1);
  isLoading = signal<boolean>(true);
  errorMessage = signal<string>('');
  notification = signal<string>('');

  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.productId.set(id);
        this.loadProduct(id);
      }
    });
  }

  loadProduct(id: string): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.productService.getProductById(id).subscribe({
      next: (data) => {
        this.product.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set(err.message || 'Product not found.');
        this.isLoading.set(false);
      }
    });
  }

  incrementQuantity(): void {
    const prod = this.product();
    if (prod && this.quantity() < prod.stock) {
      this.quantity.update((q) => q + 1);
    }
  }

  decrementQuantity(): void {
    if (this.quantity() > 1) {
      this.quantity.update((q) => q - 1);
    }
  }

  addToCart(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/signin');
      return;
    }

    if (this.authService.getRole() !== 'Customer') {
      alert('Only Customers can add products to cart.');
      return;
    }

    const prod = this.product();
    if (!prod) return;

    this.cartService.addToCart(prod._id, this.quantity()).subscribe({
      next: () => {
        this.notification.set(`Added ${this.quantity()} item(s) to your cart!`);
        setTimeout(() => this.notification.set(''), 3000);
      },
      error: (err) => {
        alert(err.message || 'Failed to add to cart.');
      }
    });
  }

  getImageUrl(imagePath?: string): string {
    if (!imagePath) return 'assets/placeholder.png';
    if (imagePath.startsWith('http')) return imagePath;
    return `http://localhost:5000${imagePath}`;
  }

  getCategoryName(cat: any): string {
    if (!cat) return 'General';
    if (typeof cat === 'object' && cat.name) return cat.name;
    return String(cat);
  }
}
