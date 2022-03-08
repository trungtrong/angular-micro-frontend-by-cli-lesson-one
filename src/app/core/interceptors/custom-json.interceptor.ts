import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

// The JsonParser class acts as the base class for custom parsers and as the DI token
@Injectable()
export abstract class JsonParser {
    abstract parse(text: string): any;
}


@Injectable()
export class CustomJsonInterceptor implements HttpInterceptor {
    constructor(private jsonParser: JsonParser) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.responseType === 'json') {
            return this.handleJsonResponse(request, next);
        } else {
            return next.handle(request);
        }
    }

    private handleJsonResponse(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Override the responseType to disable the default JSON Parsing
        request = request.clone({
            responseType: 'text'
        });
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => this.parseJsonResponse(event))
        );
    }

    private parseJsonResponse(event: HttpEvent<any>): HttpEvent<any> {
        if (event instanceof HttpResponse && typeof event.body === 'string') {
            return event.clone({
                body: this.jsonParser.parse(event.body)
            });
        } else {
            return event;
        }
    }
}
