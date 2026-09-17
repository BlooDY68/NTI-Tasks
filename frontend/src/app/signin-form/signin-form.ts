import { Component, inject, signal, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signin-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './signin-form.html',
  styleUrl: './signin-form.css'
})
export class SigninFormComponent {
  @ViewChild('loginForm') loginForm!: NgForm;

  private authService = inject(AuthService);
  private router = inject(Router);

  errorMessage = signal<string>('');
  isLoading = signal<boolean>(false);

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.errorMessage.set('');
    this.isLoading.set(true);

    const credentials = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.authService.login(credentials).subscribe({
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
        this.errorMessage.set(err.message || 'Invalid email or password. Please try again.');
      }
    });
  }
}
