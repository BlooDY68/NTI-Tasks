import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../models/ecommerce.models';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-admin-category-management',
  imports: [ReactiveFormsModule],
  templateUrl: './admin-category-management.html',
  styleUrl: './admin-category-management.css'
})
export class AdminCategoryManagementComponent implements OnInit {
  private categoryService = inject(CategoryService);

  categories = signal<Category[]>([]);
  isLoading = signal<boolean>(true);
  isSubmitting = signal<boolean>(false);
  notification = signal<string>('');
  errorMessage = signal<string>('');

  categoryForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    description: new FormControl('', [Validators.required, Validators.minLength(5)])
  });

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set(err.message || 'Failed to load categories');
        this.isLoading.set(false);
      }
    });
  }

  onSubmit(): void {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set('');

    const payload = {
      name: this.categoryForm.value.name || '',
      description: this.categoryForm.value.description || ''
    };

    this.categoryService.createCategory(payload).subscribe({
      next: (newCat) => {
        this.isSubmitting.set(false);
        this.categories.update((list) => [newCat, ...list]);
        this.categoryForm.reset();
        this.notification.set(`Category "${newCat.name}" added successfully!`);
        setTimeout(() => this.notification.set(''), 3000);
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.errorMessage.set(err.message || 'Failed to create category');
      }
    });
  }

  onDelete(id: string, name: string): void {
    if (!confirm(`Are you sure you want to delete category "${name}"?`)) return;

    this.categoryService.deleteCategory(id).subscribe({
      next: () => {
        this.categories.update((list) => list.filter((c) => c._id !== id));
        this.notification.set(`Category "${name}" deleted.`);
        setTimeout(() => this.notification.set(''), 3000);
      },
      error: (err) => {
        alert(err.message || 'Failed to delete category');
      }
    });
  }
}
