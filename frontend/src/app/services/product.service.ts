import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product, ApiResponse } from '../models/ecommerce.models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:5000/api/products';
  private httpClient = inject(HttpClient);

  getProducts(filters?: { search?: string; category?: string; brand?: string }): Observable<Product[]> {
    let params = new HttpParams();

    if (filters) {
      if (filters.search) {
        params = params.set('search', filters.search);
      }
      if (filters.category) {
        params = params.set('category', filters.category);
      }
      if (filters.brand) {
        params = params.set('brand', filters.brand);
      }
    }

    return this.httpClient
      .get<ApiResponse<{ count: number; products: Product[] }>>(this.baseUrl, { params })
      .pipe(map((res) => res.data.products));
  }

  getProductById(id: string): Observable<Product> {
    return this.httpClient
      .get<ApiResponse<{ product: Product }>>(`${this.baseUrl}/${id}`)
      .pipe(map((res) => res.data.product));
  }

  createProduct(formData: FormData): Observable<Product> {
    return this.httpClient
      .post<ApiResponse<{ product: Product }>>(this.baseUrl, formData)
      .pipe(map((res) => res.data.product));
  }

  updateProduct(id: string, formData: FormData): Observable<Product> {
    return this.httpClient
      .patch<ApiResponse<{ product: Product }>>(`${this.baseUrl}/${id}`, formData)
      .pipe(map((res) => res.data.product));
  }

  deleteProduct(id: string): Observable<any> {
    return this.httpClient.delete<ApiResponse<null>>(`${this.baseUrl}/${id}`);
  }
}
