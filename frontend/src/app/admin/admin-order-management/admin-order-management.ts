import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Order } from '../../models/ecommerce.models';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-admin-order-management',
  imports: [DatePipe],
  templateUrl: './admin-order-management.html',
  styleUrl: './admin-order-management.css'
})
export class AdminOrderManagementComponent implements OnInit {
  private orderService = inject(OrderService);

  orders = signal<Order[]>([]);
  isLoading = signal<boolean>(true);
  errorMessage = signal<string>('');
  notification = signal<string>('');

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.orderService.getAllOrders().subscribe({
      next: (data) => {
        this.orders.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set(err.message || 'Failed to load system orders');
        this.isLoading.set(false);
      }
    });
  }

  onStatusChange(orderId: string, event: Event): void {
    const newStatus = (event.target as HTMLSelectElement).value;

    this.orderService.updateOrderStatus(orderId, newStatus).subscribe({
      next: (updatedOrder) => {
        this.orders.update((list) =>
          list.map((o) => (o._id === orderId ? { ...o, orderStatus: updatedOrder.orderStatus } : o))
        );
        this.notification.set(`Order #${orderId.slice(-6)} status updated to ${newStatus}`);
        setTimeout(() => this.notification.set(''), 3000);
      },
      error: (err) => {
        alert(err.message || 'Failed to update order status');
      }
    });
  }

  onDelete(orderId: string): void {
    if (!confirm(`Are you sure you want to delete order #${orderId.slice(-6)}?`)) return;

    this.orderService.deleteOrder(orderId).subscribe({
      next: () => {
        this.orders.update((list) => list.filter((o) => o._id !== orderId));
        this.notification.set(`Order #${orderId.slice(-6)} deleted.`);
        setTimeout(() => this.notification.set(''), 3000);
      },
      error: (err) => {
        alert(err.message || 'Failed to delete order');
      }
    });
  }

  getUserDisplay(user: any): string {
    if (!user) return 'Anonymous';
    if (typeof user === 'object') {
      return `${user.name || 'User'} (${user.email || ''})`;
    }
    return String(user);
  }
}
