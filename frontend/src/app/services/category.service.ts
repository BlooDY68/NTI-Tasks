import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Category, ApiResponse } from '../models/ecommerce.models';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'http://localhost:5000/api/categories';
  private httpClient = inject(HttpClient);

  getCategories(): Observable<Category[]> {
    return this.httpClient
      .get<ApiResponse<{ count: number; categories: Category[] }>>(this.baseUrl)
      .pipe(map((res) => res.data.categories));
  }

  getCategoryById(id: string): Observable<Category> {
    return this.httpClient
      .get<ApiResponse<{ category: Category }>>(`${this.baseUrl}/${id}`)
      .pipe(map((res) => res.data.category));
  }

  createCategory(categoryData: { name: string; description: string }): Observable<Category> {
    return this.httpClient
      .post<ApiResponse<{ category: Category }>>(this.baseUrl, categoryData)
      .pipe(map((res) => res.data.category));
  }

  updateCategory(id: string, categoryData: { name: string; description: string }): Observable<Category> {
    return this.httpClient
      .patch<ApiResponse<{ category: Category }>>(`${this.baseUrl}/${id}`, categoryData)
      .pipe(map((res) => res.data.category));
  }

  deleteCategory(id: string): Observable<any> {
    return this.httpClient.delete<ApiResponse<null>>(`${this.baseUrl}/${id}`);
  }
}
