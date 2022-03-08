import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
//
import {ApiService} from '../services';
import {filter, map} from 'rxjs/operators';

@Injectable()
export class FormatInterceptor implements HttpInterceptor {
    constructor(private apiService: ApiService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            filter((event) => event instanceof HttpResponse),
            map((event: HttpResponse<any>) => event.clone({
                body: event.body.data
            }))
        );
    }
}
