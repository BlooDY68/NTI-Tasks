import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Cart } from '../models/ecommerce.models';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class CheckoutComponent implements OnInit {
  private cartService = inject(CartService);
  private orderService = inject(OrderService);
  private router = inject(Router);

  cart = signal<Cart | null>(null);
  isLoading = signal<boolean>(true);
  isSubmitting = signal<boolean>(false);
  errorMessage = signal<string>('');

  checkoutForm = new FormGroup({
    street: new FormControl('', [Validators.required, Validators.minLength(3)]),
    city: new FormControl('', [Validators.required, Validators.minLength(2)]),
    state: new FormControl('', [Validators.required]),
    postalCode: new FormControl('', [Validators.required, Validators.minLength(3)]),
    country: new FormControl('Egypt', [Validators.required]),
    paymentMethod: new FormControl<'Cash on Delivery' | 'Credit Card' | 'PayPal'>('Cash on Delivery', [Validators.required])
  });

  ngOnInit(): void {
    this.cartService.getCart().subscribe({
      next: (data) => {
        if (!data || !data.items || data.items.length === 0) {
          this.router.navigateByUrl('/cart');
          return;
        }
        this.cart.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.router.navigateByUrl('/cart');
      }
    });
  }

  onSubmit(): void {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    this.errorMessage.set('');
    this.isSubmitting.set(true);

    const formVal = this.checkoutForm.value;
    const orderData = {
      shippingAddress: {
        street: formVal.street || '',
        city: formVal.city || '',
        state: formVal.state || '',
        postalCode: formVal.postalCode || '',
        country: formVal.country || 'Egypt'
      },
      paymentMethod: (formVal.paymentMethod || 'Cash on Delivery') as 'Cash on Delivery' | 'Credit Card' | 'PayPal'
    };

    this.orderService.createOrder(orderData).subscribe({
      next: (order) => {
        this.isSubmitting.set(false);
        this.cartService.cartCountSignal.set(0);
        this.router.navigateByUrl('/my-orders');
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.errorMessage.set(err.message || 'Failed to place order. Please try again.');
      }
    });
  }
}
