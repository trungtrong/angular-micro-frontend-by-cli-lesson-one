import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
//
import {ApiService} from '../services';
import {filter, finalize, map, tap} from 'rxjs/operators';

@Injectable()
export class ProfilingInterceptor implements HttpInterceptor {
    startedDate: number = Date.now();
    ok: string;

    constructor() {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // NOTE: tap -> Subscription do next() method
        return next.handle(request).pipe(
            tap(
                (event: HttpEvent<any>) => this.ok = event instanceof HttpResponse ? 'Success' : '',
                (error: HttpErrorResponse) => this.ok = 'failed',
            ),
            finalize(() => {
                const elapsed: number = Date.now() - this.startedDate;
                const message = `${request.method} ${request.urlWithParams} ${this.ok} in ${elapsed} ms.`;
                console.log(message);
            })
        );
    }
}
