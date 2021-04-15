import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  headers: object = {};
  options: object = {};

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * Run a query
   */
  request(method: string, path: string, data: any, header?: any): Observable<object> {
    const headersSetup = {
      headers: new HttpHeaders(header),
      body: '',
      params: new HttpParams(),
    };

    if (method === 'post') {
      if (headersSetup.headers.get('Content-Type') === 'application/x-www-form-urlencoded') {
        const bodySetup = new URLSearchParams(Object.keys(data).map(key => [key, data[key]]));

        headersSetup.body = bodySetup.toString();
      } else {
        headersSetup.body = data;
      }
    } else if (method === 'get') {
      headersSetup.params = new HttpParams(data);
    }

    return this.http.request(method, environment.apiUrl + path, headersSetup).pipe(
      catchError(error => {
        throw this.handleError(error);
      }),
    );
  }

  /**
   * Create a standardized object when a response is successful
   */
  successDataPrepare(message: string, result: any): object{
    const response = {status: true, message: (typeof message !== 'undefined' && message !== '') ? message : '', result};

    console.log('HANDLE SUCCESS', response);
    return response;
  }

  /**
   * Create a standardized object when a response is wrong
   */
  errorDataPrepare(message: string, result: any): object {
    const response = {status: false, message: (typeof message !== 'undefined' && message !== '') ? message : '', result};

    console.log('HANDLE ERROR', response);
    return response;
  }

  /**
   * Function to manipulate the errors returned by API
   */
  private handleError(error: HttpErrorResponse): object {
    if (error.error instanceof ErrorEvent) {
      console.error('API', 'An error occurred:', error.error.message);
    } else {
      console.error('API', 'Backend returned code ' + error.status + ', body was: ' + error.message);
    }

    return {response: {status: false, message: 'Ocurrió un error al solicitar la información. Estamos trabajando para solucionar este problema.'}};
  }
}
