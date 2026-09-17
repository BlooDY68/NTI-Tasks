import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unknown error occurred';

      if (error.error instanceof ErrorEvent) {

        errorMessage = `Network Error: ${error.error.message}`;
      } else if (error.error && typeof error.error === 'object' && error.error.message) {

        errorMessage = error.error.message;
        if (Array.isArray(error.error.errors) && error.error.errors.length > 0) {
          errorMessage += ` (${error.error.errors.join(', ')})`;
        }
      } else if (typeof error.error === 'string') {
        errorMessage = error.error;
      } else {
        errorMessage = `Server Error [Status ${error.status}]: ${error.statusText || 'Request failed'}`;
      }

      return throwError(() => new Error(errorMessage));
    })
  );
};
