import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { User } from '../../models/ecommerce.models';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-user-management',
  imports: [DatePipe],
  templateUrl: './admin-user-management.html',
  styleUrl: './admin-user-management.css'
})
export class AdminUserManagementComponent implements OnInit {
  private userService = inject(UserService);
  private authService = inject(AuthService);

  users = signal<User[]>([]);
  isLoading = signal<boolean>(true);
  errorMessage = signal<string>('');
  notification = signal<string>('');

  currentAdminId = this.authService.currentUserSignal()?._id;

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set(err.message || 'Failed to load users');
        this.isLoading.set(false);
      }
    });
  }

  onRoleToggle(user: User): void {
    const newRole = user.role === 'Admin' ? 'Customer' : 'Admin';
    if (!confirm(`Change role for "${user.name}" from ${user.role} to ${newRole}?`)) return;

    this.userService.updateUserRole(user._id, newRole).subscribe({
      next: (updated) => {
        this.users.update((list) =>
          list.map((u) => (u._id === user._id ? { ...u, role: updated.role } : u))
        );
        this.notification.set(`Role for "${user.name}" updated to ${newRole}.`);
        setTimeout(() => this.notification.set(''), 3000);
      },
      error: (err) => {
        alert(err.message || 'Failed to update user role');
      }
    });
  }

  onDelete(user: User): void {
    if (user._id === this.currentAdminId) {
      alert('You cannot delete your own active admin account.');
      return;
    }

    if (!confirm(`Are you sure you want to permanently delete user "${user.name}"?`)) return;

    this.userService.deleteUser(user._id).subscribe({
      next: () => {
        this.users.update((list) => list.filter((u) => u._id !== user._id));
        this.notification.set(`User "${user.name}" was deleted.`);
        setTimeout(() => this.notification.set(''), 3000);
      },
      error: (err) => {
        alert(err.message || 'Failed to delete user');
      }
    });
  }
}
