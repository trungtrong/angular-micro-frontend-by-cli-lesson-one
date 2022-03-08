import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class FormatBodyInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            filter((event) => event instanceof HttpResponse),
            map((event: HttpResponse<any>) => event.clone({
                body: event.body.data.trim()
            }))
        );
    }
}
