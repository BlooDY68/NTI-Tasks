import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User, ApiResponse } from '../models/ecommerce.models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:5000/api/users';
  private httpClient = inject(HttpClient);

  getProfile(): Observable<User> {
    return this.httpClient
      .get<ApiResponse<{ user: User }>>(`${this.baseUrl}/profile`)
      .pipe(map((res) => res.data.user));
  }

  updateProfile(data: any): Observable<User> {
    return this.httpClient
      .patch<ApiResponse<{ user: User }>>(`${this.baseUrl}/profile`, data)
      .pipe(map((res) => res.data.user));
  }

  getAllUsers(): Observable<User[]> {
    return this.httpClient
      .get<ApiResponse<{ count: number; users: User[] }>>(this.baseUrl)
      .pipe(map((res) => res.data.users));
  }

  getUserById(id: string): Observable<User> {
    return this.httpClient
      .get<ApiResponse<{ user: User }>>(`${this.baseUrl}/${id}`)
      .pipe(map((res) => res.data.user));
  }

  updateUserRole(id: string, role: 'Admin' | 'Customer'): Observable<User> {
    return this.httpClient
      .patch<ApiResponse<{ user: User }>>(`${this.baseUrl}/${id}/role`, { role })
      .pipe(map((res) => res.data.user));
  }

  deleteUser(id: string): Observable<any> {
    return this.httpClient.delete<ApiResponse<null>>(`${this.baseUrl}/${id}`);
  }
}
