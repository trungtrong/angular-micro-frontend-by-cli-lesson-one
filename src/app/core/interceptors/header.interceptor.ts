import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
//
import {ApiService} from '../services';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
    constructor(private apiService: ApiService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const API_KEYS = '123456';
        return next.handle(request.clone({
            setHeaders: {API_KEYS}
        }));
    }
}
