import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/ecommerce.models';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-admin-product-management',
  imports: [RouterLink],
  templateUrl: './admin-product-management.html',
  styleUrl: './admin-product-management.css'
})
export class AdminProductManagementComponent implements OnInit {
  private productService = inject(ProductService);

  products = signal<Product[]>([]);
  isLoading = signal<boolean>(true);
  errorMessage = signal<string>('');
  notification = signal<string>('');

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.productService.getProducts().subscribe({
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

  onDelete(productId: string, productName: string): void {
    if (!confirm(`Are you sure you want to permanently delete "${productName}"?`)) return;

    this.productService.deleteProduct(productId).subscribe({
      next: () => {

        this.products.update((list) => list.filter((p) => p._id !== productId));
        this.notification.set(`Product "${productName}" was deleted successfully.`);
        setTimeout(() => this.notification.set(''), 3000);
      },
      error: (err) => {
        alert(err.message || 'Failed to delete product');
      }
    });
  }

  getImageUrl(imagePath?: string): string {
    if (!imagePath) return 'assets/placeholder.png';
    if (imagePath.startsWith('http')) return imagePath;
    return `http://localhost:5000${imagePath}`;
  }

  getCategoryName(cat: any): string {
    if (!cat) return 'Uncategorized';
    if (typeof cat === 'object' && cat.name) return cat.name;
    return String(cat);
  }
}
