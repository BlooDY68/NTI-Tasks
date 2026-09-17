import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Category, Product } from '../../models/ecommerce.models';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-admin-product-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './admin-product-form.html',
  styleUrl: './admin-product-form.css'
})
export class AdminProductFormComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  categories = signal<Category[]>([]);
  isEditMode = signal<boolean>(false);
  productId = signal<string>('');
  currentProduct = signal<Product | null>(null);
  selectedFile: File | null = null;
  isLoading = signal<boolean>(false);
  isSubmitting = signal<boolean>(false);
  errorMessage = signal<string>('');

  productForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    description: new FormControl('', [Validators.required, Validators.minLength(5)]),
    price: new FormControl<number | null>(null, [Validators.required, Validators.min(0.01)]),
    category: new FormControl('', [Validators.required]),
    brand: new FormControl('', [Validators.required]),
    stock: new FormControl<number | null>(0, [Validators.required, Validators.min(0)])
  });

  ngOnInit(): void {
    this.loadCategories();

    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.isEditMode.set(true);
        this.productId.set(id);
        this.loadProductDetails(id);
      }
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => this.categories.set(data),
      error: () => {}
    });
  }

  loadProductDetails(id: string): void {
    this.isLoading.set(true);
    this.productService.getProductById(id).subscribe({
      next: (prod) => {
        this.currentProduct.set(prod);
        const categoryId = typeof prod.category === 'object' ? prod.category._id : prod.category;

        this.productForm.patchValue({
          name: prod.name,
          description: prod.description,
          price: prod.price,
          category: categoryId,
          brand: prod.brand,
          stock: prod.stock
        });
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set(err.message || 'Failed to load product for editing');
        this.isLoading.set(false);
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set('');

    const formVal = this.productForm.value;
    const formData = new FormData();

    formData.append('name', formVal.name || '');
    formData.append('description', formVal.description || '');
    formData.append('price', String(formVal.price || 0));
    formData.append('category', formVal.category || '');
    formData.append('brand', formVal.brand || '');
    formData.append('stock', String(formVal.stock || 0));

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    if (this.isEditMode()) {
      this.productService.updateProduct(this.productId(), formData).subscribe({
        next: () => {
          this.isSubmitting.set(false);
          this.router.navigateByUrl('/admin/products');
        },
        error: (err) => {
          this.isSubmitting.set(false);
          this.errorMessage.set(err.message || 'Failed to update product');
        }
      });
    } else {
      this.productService.createProduct(formData).subscribe({
        next: () => {
          this.isSubmitting.set(false);
          this.router.navigateByUrl('/admin/products');
        },
        error: (err) => {
          this.isSubmitting.set(false);
          this.errorMessage.set(err.message || 'Failed to create product');
        }
      });
    }
  }

  getImageUrl(imagePath?: string): string {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    return `http://localhost:5000${imagePath}`;
  }
}
