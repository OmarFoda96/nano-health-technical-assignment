import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ApiError } from '@shared/models/api-response.model';

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let apiError: ApiError;

      if (error.error instanceof ErrorEvent) {
        apiError = {
          message: error.error.message,
          status: 0,
          timestamp: new Date().toISOString()
        };
      } else {
        apiError = {
          message: error.error?.message || error.message || 'An unexpected error occurred',
          status: error.status,
          timestamp: new Date().toISOString()
        };
      }

      const normalizedError = new HttpErrorResponse({
        error: apiError,
        status: apiError.status,
        statusText: apiError.message
      });

      return throwError(() => normalizedError);
    })
  );
};
