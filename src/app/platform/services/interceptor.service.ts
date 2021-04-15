import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/platform/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  public tokenValidation = new BehaviorSubject<boolean>(true);

  constructor(
    private localStorageService: LocalStorageService
  ) { }

  /**
   * Intercept all HTTP requests
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = this.localStorageService.tokenGet();

    let requestNew = request;

    if (token) {
      requestNew = request.clone({
        setHeaders: {
          authorization: 'Bearer ' + token
        }
      });
    }

    return next.handle(requestNew).pipe(
      catchError((error: HttpErrorResponse) => {
        if (typeof error.status !== 'undefined' && error.status === 401) {
          console.error('API', 'Token expiration');
          this.tokenValidation.next(false);
        }

        return throwError(error);
      })
    );
  }
}
