import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {catchError, filter, switchMap, take} from 'rxjs/operators';
import {JwtHelperService, JwtInterceptor} from '@auth0/angular-jwt';
//
import {AppStorage} from '@app/utilities';
import {ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY} from '@app/shared/constants';
import {AuthenticationService, ApiService} from '../services';
import * as moment from 'moment';
import {environment} from '@environment';
import {AccessTokenResponse} from '@app/models/shared';
import {randomRefreshToken} from '@app/data/auth';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
    isRefreshing: boolean = false;

    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private authService: AuthenticationService,
                private jwtService: JwtHelperService,
                private jwtInterceptor: JwtInterceptor,
                private apiService: ApiService) {
    }

    /* intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authService.isLoggedIn() && !this.jwtInterceptor.isDisallowedRoute(req)) {
            return next.handle(req).pipe(catchError((error) => {
                const errorResponse = error as HttpErrorResponse;
                if (errorResponse.status === 401 || this.jwtService.isTokenExpired(AppStorage.getTokenData(ACCESS_TOKEN_KEY))) {
                    return this.authService.refreshAccessToken().pipe(
                        switchMap(() => {
                            const updatedRequest = req.clone({
                                setHeaders: {
                                    Authorization: this.apiService.headerAuthorizationKey
                                }
                            });

                            return this.jwtInterceptor.intercept(updatedRequest, next);
                        })
                    ).pipe(catchError((error) => {
                        this.authService.logout();
                        return throwError(error);
                    }))
                }

                return throwError(error);
            }));
        }
    } */

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // if (this.isLoggedIn && this.isRememberMe && refreshExpired) {
        //   this.store.dispatch(new Logout());
        //   return next.handle(req);
        // }

        // if (this.isRememberMe && this.isLoggedIn && accessExpired) {
        if (this.authService.isLoggedIn()) {
            return next.handle(req).pipe(catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    return this.handleTokenRefreshing(req, next);
                }
                // return this.jwtInterceptor.intercept(updatedRequest, next);
                return throwError(error);
            }));
        } else {
            // @ts-ignore
            return next.handle(req).pipe(catchError((error: HttpErrorResponse) => {
                const errorResponse = error as HttpErrorResponse;
                if (errorResponse.status === 401)
                // this.store.dispatch(new Logout());
                {return throwError(error);}
            }));
        }
    }
    refreshAccessToken(): Observable<AccessTokenResponse> {
        return of(randomRefreshToken());
    }

    private updateRequestAuthorizationHeader(request: HttpRequest<any>, accessToken: string): HttpRequest<any> {
        return request.clone({
            setHeaders: {
                Authorization: this.apiService.headerAuthorizationKey
            }
        });
    }

    private handleTokenRefreshing(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
        // Call API to refresh token
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.refreshAccessToken().pipe(
                // Switch map to refresh token
                switchMap((token) => {
                    this.isRefreshing = false;
                    // TODO: Store AccessToken
                    // this.store.dispatch(new SetTokenUser({token}));
                    // AppStorage.storeTokenData(REFRESH_TOKEN_KEY, tokens.refreshToken);
                    // AppStorage.storeTokenData(ACCESS_TOKEN_KEY, tokens.accessToken);

                    this.refreshTokenSubject.next(token);
                    return next.handle(this.updateRequestAuthorizationHeader(request, token.accessToken));
                }),

                // Logout if refresh token request return error
                catchError(err =>
                    // this.store.dispatch(new Logout());
                    throwError(err)
                )
            );

        } else {
            /* handle in the case, there are a lot of requests are made
            - Ex: Request A is called -> accessToken is expired -> call get AccessToken -> isRefreshing = true
                  + But Request B is also called and isRefreshing = true -> Getting AccessToken
                  + we have to return "Completed" Observable if token = null
                        + return token when Request A is received AccessToken

            - we will wait until refreshTokenSubject has a non-null value
            - which means the new token is ready and we can retry the request again */
            return this.refreshTokenSubject.pipe(
                filter(token => token != null),
                take(1),
                switchMap((jwt) => next.handle(this.updateRequestAuthorizationHeader(request, jwt.accessToken))));
        }
    }
}
