import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Product, Category } from '../models/ecommerce.models';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-product-list',
  imports: [RouterLink],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private cartService = inject(CartService);
  private authService = inject(AuthService);
  private router = inject(Router);

  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  selectedCategory = signal<string>('');
  searchQuery = signal<string>('');
  isLoading = signal<boolean>(true);
  errorMessage = signal<string>('');
  notification = signal<string>('');

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => this.categories.set(data),
      error: () => {}
    });
  }

  loadProducts(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.productService
      .getProducts({
        search: this.searchQuery(),
        category: this.selectedCategory()
      })
      .subscribe({
        next: (data) => {
          this.products.set(data);
          this.isLoading.set(false);
        },
        error: (err) => {
          this.errorMessage.set(err.message || 'Failed to load products');
          this.isLoading.set(false);
        }
      });
  }

  onSearch(event: Event): void {
    const query = (event.target as HTMLInputElement).value;
    this.searchQuery.set(query);
    this.loadProducts();
  }

  onCategorySelect(event: Event): void {
    const categoryId = (event.target as HTMLSelectElement).value;
    this.selectedCategory.set(categoryId);
    this.loadProducts();
  }

  addToCart(product: Product): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/signin');
      return;
    }

    if (this.authService.getRole() !== 'Customer') {
      alert('Only Customers can add products to cart.');
      return;
    }

    this.cartService.addToCart(product._id, 1).subscribe({
      next: () => {
        this.notification.set(`"${product.name}" was added to your cart!`);
        setTimeout(() => this.notification.set(''), 3000);
      },
      error: (err) => {
        alert(err.message || 'Could not add product to cart');
      }
    });
  }

  getImageUrl(imagePath: string): string {
    if (!imagePath) return 'assets/placeholder.png';
    if (imagePath.startsWith('http')) return imagePath;
    return `http://localhost:5000${imagePath}`;
  }
}
