import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { Cart, ApiResponse } from '../models/ecommerce.models';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = 'http://localhost:5000/api/cart';
  private httpClient = inject(HttpClient);

  cartCountSignal = signal<number>(0);

  getCart(): Observable<Cart> {
    return this.httpClient.get<ApiResponse<{ cart: Cart }>>(this.baseUrl).pipe(
      map((res) => res.data.cart),
      tap((cart) => {
        if (cart && typeof cart.totalItems === 'number') {
          this.cartCountSignal.set(cart.totalItems);
        }
      })
    );
  }

  addToCart(productId: string, quantity: number = 1): Observable<Cart> {
    return this.httpClient
      .post<ApiResponse<{ cart: Cart }>>(`${this.baseUrl}/items`, { productId, quantity })
      .pipe(
        map((res) => res.data.cart),
        tap((cart) => {
          if (cart && typeof cart.totalItems === 'number') {
            this.cartCountSignal.set(cart.totalItems);
          }
        })
      );
  }

  updateQuantity(productId: string, quantity: number): Observable<Cart> {
    return this.httpClient
      .patch<ApiResponse<{ cart: Cart }>>(`${this.baseUrl}/items/${productId}`, { quantity })
      .pipe(
        map((res) => res.data.cart),
        tap((cart) => {
          if (cart && typeof cart.totalItems === 'number') {
            this.cartCountSignal.set(cart.totalItems);
          }
        })
      );
  }

  removeItem(productId: string): Observable<Cart> {
    return this.httpClient
      .delete<ApiResponse<{ cart: Cart }>>(`${this.baseUrl}/items/${productId}`)
      .pipe(
        map((res) => res.data.cart),
        tap((cart) => {
          if (cart && typeof cart.totalItems === 'number') {
            this.cartCountSignal.set(cart.totalItems);
          }
        })
      );
  }

  clearCart(): Observable<any> {
    return this.httpClient.delete<ApiResponse<null>>(this.baseUrl).pipe(
      tap(() => {
        this.cartCountSignal.set(0);
      })
    );
  }
}
