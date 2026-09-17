import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list';
import { ProductDetailsComponent } from './product-details/product-details';
import { SigninFormComponent } from './signin-form/signin-form';
import { SignupFormComponent } from './signup-form/signup-form';
import { CartComponent } from './cart/cart';
import { CheckoutComponent } from './checkout/checkout';
import { MyOrdersComponent } from './my-orders/my-orders';
import { ProfileComponent } from './profile/profile';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard';
import { AdminProductManagementComponent } from './admin/admin-product-management/admin-product-management';
import { AdminProductFormComponent } from './admin/admin-product-form/admin-product-form';
import { AdminCategoryManagementComponent } from './admin/admin-category-management/admin-category-management';
import { AdminOrderManagementComponent } from './admin/admin-order-management/admin-order-management';
import { AdminUserManagementComponent } from './admin/admin-user-management/admin-user-management';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { customerGuard } from './guards/customer.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductListComponent, title: 'Store Products' },
  { path: 'products/:id', component: ProductDetailsComponent, title: 'Product Details' },
  { path: 'signin', component: SigninFormComponent, title: 'Sign In' },
  { path: 'signup', component: SignupFormComponent, title: 'Create Account' },

  { path: 'cart', component: CartComponent, title: 'Shopping Cart', canActivate: [authGuard, customerGuard] },
  { path: 'checkout', component: CheckoutComponent, title: 'Checkout Order', canActivate: [authGuard, customerGuard] },
  { path: 'my-orders', component: MyOrdersComponent, title: 'Order History', canActivate: [authGuard, customerGuard] },
  { path: 'profile', component: ProfileComponent, title: 'My Profile', canActivate: [authGuard] },

  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [adminGuard],
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      { path: 'products', component: AdminProductManagementComponent, title: 'Admin - Products' },
      { path: 'products/new', component: AdminProductFormComponent, title: 'Admin - Add Product' },
      { path: 'products/edit/:id', component: AdminProductFormComponent, title: 'Admin - Edit Product' },
      { path: 'categories', component: AdminCategoryManagementComponent, title: 'Admin - Categories' },
      { path: 'orders', component: AdminOrderManagementComponent, title: 'Admin - Orders' },
      { path: 'users', component: AdminUserManagementComponent, title: 'Admin - Users' }
    ]
  },

  { path: '**', redirectTo: 'products' }
];
