import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { LoadingService } from '@core/services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private readonly loaderService: LoadingService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const startTime = performance.now();
    const requestId = Math.random().toString(36).substring(2, 11);

    console.log(`🚀 [Request Started] ${requestId}`, {
      url: request.url,
      method: request.method,
      timestamp: new Date().toISOString(),
      headers: request.headers.keys()
    });

    this.loaderService.show();

    return next.handle(request).pipe(
      tap({
        next: (event) => {
          if (event instanceof HttpResponse) {
            const endTime = performance.now();
            const duration = Math.round(endTime - startTime);

            console.log(`✅ [Response Received] ${requestId}`, {
              url: request.url,
              method: request.method,
              status: event.status,
              statusText: event.statusText,
              duration: `${duration}ms`,
              timestamp: new Date().toISOString(),
              bodySize: event.body ? JSON.stringify(event.body).length + ' chars' : 'No body'
            });
          }
        },
        error: (error) => {
          const endTime = performance.now();
          const duration = Math.round(endTime - startTime);

          console.error(`❌ [Request Failed] ${requestId}`, {
            url: request.url,
            method: request.method,
            error: error.message || error,
            status: error.status || 'Unknown',
            duration: `${duration}ms`,
            timestamp: new Date().toISOString()
          });
        }
      }),
      finalize(() => {
        const endTime = performance.now();
        const totalDuration = Math.round(endTime - startTime);

        console.log(`🏁 [Request Completed] ${requestId}`, {
          url: request.url,
          method: request.method,
          totalDuration: `${totalDuration}ms`,
          timestamp: new Date().toISOString()
        });

        this.loaderService.hide();
      })
    );
  }
}
