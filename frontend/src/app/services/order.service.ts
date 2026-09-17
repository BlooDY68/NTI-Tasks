import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Order, ShippingAddress, ApiResponse } from '../models/ecommerce.models';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = 'http://localhost:5000/api/orders';
  private httpClient = inject(HttpClient);

  createOrder(orderData: {
    shippingAddress: ShippingAddress;
    paymentMethod: 'Cash on Delivery' | 'Credit Card' | 'PayPal';
  }): Observable<Order> {
    return this.httpClient
      .post<ApiResponse<{ order: Order }>>(this.baseUrl, orderData)
      .pipe(map((res) => res.data.order));
  }

  getMyOrders(): Observable<Order[]> {
    return this.httpClient
      .get<ApiResponse<{ count: number; orders: Order[] }>>(`${this.baseUrl}/my-orders`)
      .pipe(map((res) => res.data.orders));
  }

  getOrderById(id: string): Observable<Order> {
    return this.httpClient
      .get<ApiResponse<{ order: Order }>>(`${this.baseUrl}/${id}`)
      .pipe(map((res) => res.data.order));
  }

  getAllOrders(): Observable<Order[]> {
    return this.httpClient
      .get<ApiResponse<{ count: number; orders: Order[] }>>(this.baseUrl)
      .pipe(map((res) => res.data.orders));
  }

  updateOrderStatus(id: string, status: string): Observable<Order> {
    return this.httpClient
      .patch<ApiResponse<{ order: Order }>>(`${this.baseUrl}/${id}/status`, { status })
      .pipe(map((res) => res.data.order));
  }

  deleteOrder(id: string): Observable<any> {
    return this.httpClient.delete<ApiResponse<null>>(`${this.baseUrl}/${id}`);
  }
}
