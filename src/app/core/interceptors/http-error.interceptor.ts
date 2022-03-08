import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
//
import {AppNotify} from '@app/utilities';

// https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#4xx_Client_errors
enum ServerErrorStatus {
    BadRequest = 400,
    Unauthorized = 401,
    PermissionDenied = 403,
    InternalServer = 500,
}

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // retry(1) function to our interceptor to retry all requests once before failing
        // If the call fails, retry until 5 times before throwing an error
        //             retry(1),

        return next.handle(req).pipe(
            catchError((response) => {
                if (response instanceof HttpErrorResponse) {
                    // console.error(response.error);
                    //
                    switch (response.status) {
                    case ServerErrorStatus.PermissionDenied:
                        return throwError('Permission Denied');
                    case ServerErrorStatus.InternalServer:
                        let error = response.error ? response.error.message : response.statusText;
                        if (!error) {
                            error = 'Internal Server Error';
                        }
                        AppNotify.error(error);
                        //
                        return throwError(response);
                    case ServerErrorStatus.BadRequest:
                        let messageError: string;
                        if (!!response.error && !!response.error.message) {
                            messageError = response.error.message;
                        } else {
                            messageError = 'Something Bad Happened';
                        }

                        AppNotify.error(messageError);

                        // return an observable with a user-facing error message
                        return throwError(messageError);
                    default:
                        if (response.error instanceof ErrorEvent) {
                            // go to client-error.handler
                            return throwError(response);
                        }
                    }
                } else {
                    return throwError(response);
                }
            })
        );
    }
}
