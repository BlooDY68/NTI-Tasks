import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signup-form.html',
  styleUrl: './signup-form.css'
})
export class SignupFormComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  private authService = inject(AuthService);
  private router = inject(Router);

  selectedFile: File | null = null;
  errorMessage = signal<string>('');
  isLoading = signal<boolean>(false);

  signupForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    role: new FormControl<'Customer' | 'Admin'>('Customer', [Validators.required])
  });

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    this.errorMessage.set('');
    this.isLoading.set(true);

    const formData = new FormData();
    formData.append('name', this.signupForm.value.name || '');
    formData.append('email', this.signupForm.value.email || '');
    formData.append('password', this.signupForm.value.password || '');
    formData.append('role', this.signupForm.value.role || 'Customer');

    if (this.selectedFile) {
      formData.append('profileImage', this.selectedFile);
    }

    this.authService.register(formData).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        const role = res.data.user.role;
        if (role === 'Admin') {
          this.router.navigateByUrl('/admin/products');
        } else {
          this.router.navigateByUrl('/products');
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.message || 'Registration failed. Please try again.');
      }
    });
  }
}
