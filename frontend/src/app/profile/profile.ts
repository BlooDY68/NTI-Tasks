import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { User } from '../models/ecommerce.models';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class ProfileComponent implements OnInit {
  private userService = inject(UserService);
  private authService = inject(AuthService);

  user = signal<User | null>(null);
  isLoading = signal<boolean>(true);
  isSubmitting = signal<boolean>(false);
  notification = signal<string>('');
  errorMessage = signal<string>('');

  profileForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    password: new FormControl('', [Validators.minLength(6)])
  });

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.userService.getProfile().subscribe({
      next: (data) => {
        this.user.set(data);
        this.profileForm.patchValue({
          name: data.name
        });
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set(err.message || 'Failed to load profile');
        this.isLoading.set(false);
      }
    });
  }

  onSubmit(): void {
    if (this.profileForm.invalid) return;

    this.isSubmitting.set(true);
    this.notification.set('');
    this.errorMessage.set('');

    const payload: any = {
      name: this.profileForm.value.name
    };

    if (this.profileForm.value.password) {
      payload.password = this.profileForm.value.password;
    }

    this.userService.updateProfile(payload).subscribe({
      next: (updatedUser) => {
        this.isSubmitting.set(false);
        this.user.set(updatedUser);
        this.authService.currentUserSignal.set(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        this.notification.set('Profile updated successfully!');
        this.profileForm.get('password')?.reset();
        setTimeout(() => this.notification.set(''), 3000);
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.errorMessage.set(err.message || 'Failed to update profile');
      }
    });
  }

  getImageUrl(imagePath?: string): string {
    if (!imagePath) return 'assets/default-avatar.png';
    if (imagePath.startsWith('http')) return imagePath;
    return `http://localhost:5000${imagePath}`;
  }
}
