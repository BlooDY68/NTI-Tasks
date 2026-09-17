import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, Observable } from 'rxjs';
import { User, ApiResponse } from '../models/ecommerce.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5000/api/auth';
  private httpClient = inject(HttpClient);
  private router = inject(Router);

  isLoggedInSignal = signal<boolean>(false);
  currentUserSignal = signal<User | null>(null);

  constructor() {
    this.restoreUserSession();
  }

  private restoreUserSession(): void {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');

    if (token && userStr) {
      try {
        const user: User = JSON.parse(userStr);
        this.currentUserSignal.set(user);
        this.isLoggedInSignal.set(true);
      } catch {
        this.logout();
      }
    } else {
      this.isLoggedInSignal.set(false);
      this.currentUserSignal.set(null);
    }
  }

  isLoggedIn(): boolean {
    return this.isLoggedInSignal();
  }

  getRole(): 'Admin' | 'Customer' | null {
    const user = this.currentUserSignal();
    return user ? user.role : null;
  }

  getCurrentUser(): User | null {
    return this.currentUserSignal();
  }

  login(credentials: { email: string; password: string }): Observable<ApiResponse<{ user: User }>> {
    return this.httpClient.post<ApiResponse<{ user: User }>>(`${this.baseUrl}/login`, credentials).pipe(
      tap((res) => {
        if (res && res.data && res.data.user) {
          const user = res.data.user;

          localStorage.setItem('token', user._id);
          localStorage.setItem('user', JSON.stringify(user));

          this.currentUserSignal.set(user);
          this.isLoggedInSignal.set(true);
        }
      })
    );
  }

  register(userData: FormData | { name: string; email: string; password: string; role?: string }): Observable<ApiResponse<{ user: User }>> {
    return this.httpClient.post<ApiResponse<{ user: User }>>(`${this.baseUrl}/register`, userData).pipe(
      tap((res) => {
        if (res && res.data && res.data.user) {
          const user = res.data.user;
          localStorage.setItem('token', user._id);
          localStorage.setItem('user', JSON.stringify(user));

          this.currentUserSignal.set(user);
          this.isLoggedInSignal.set(true);
        }
      })
    );
  }

  logout(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.httpClient.post(`${this.baseUrl}/logout`, {}).subscribe({
        next: () => {},
        error: () => {}
      });
    }

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isLoggedInSignal.set(false);
    this.currentUserSignal.set(null);
    this.router.navigateByUrl('/signin');
  }
}
