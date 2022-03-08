import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
//
import {AppStorage} from '@app/utilities';
import {ACCESS_TOKEN_KEY, AUTH_SCHEME} from '@app/shared/constants';
import {API_URL} from '../../utilities/endpoints';
import {AppNotify} from '../../utilities/notification-helper';
import {AppUrl} from '../../utilities/app-url';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private httpClient: HttpClient,
                private router: Router) {
    }

    get accessToken(): string {
        return AppStorage.getTokenData(ACCESS_TOKEN_KEY);
    }

    get headerAuthorizationKey(): string {
        return AUTH_SCHEME + this.accessToken;
    }

    get headers(): {headers: HttpHeaders} {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Accept: 'q=0.8;application/json;q=0.9',
                APIKey: '~123456789~',
                Authorization: this.headerAuthorizationKey
            })
        };
    }

    get httpOptions() {
        return {
            ...this.headers,
        };
    }

    get formDataHeaders(): HttpHeaders {
        return new HttpHeaders({
            Accept: 'application/json',
            Authorization: this.headerAuthorizationKey,
        });
    }

    get blobFileHeaders(): {headers: HttpHeaders} {
        return {
            headers: new HttpHeaders({
                Accept: 'application/json',
                Authorization: this.headerAuthorizationKey,
                responseType: 'blob'
            })
        };
    }

    get<T>(url: string): Observable<T> {
        return this.httpClient
            .get<T>(`${API_URL}/${url}`, this.headers)
            .pipe(catchError((error) => this.handleError(error, url)));
    }

    getBlobFile(url: string): Observable<Blob | ArrayBuffer> {
        return this.httpClient.get<Blob>(url, this.blobFileHeaders).pipe(
            tap((res) => {
                // dowload file
            }),
            catchError((error) => this.handleError(error, url))
        );
    }

    post<T>(url: string, data: any): Observable<T> {
        if (data instanceof FormData) {
            const httpOptions = {
                headers: this.formDataHeaders
            };
            return this.httpClient.post<T>(`${API_URL}/${url}`, data, httpOptions)
                .pipe(catchError((error) => this.handleError(error, url)));
        } else {
            return this.httpClient
                .post<T>(`${API_URL}/${url}`, data, this.headers)
                .pipe(catchError((error) => this.handleError(error, url)));
        }
    }

    postAndGetBlobFile() {

    }

    delete<T>(url: string): Observable<T> {
        const params: URLSearchParams = new URLSearchParams();
        const options = this.headers;

        if (params) {
            for (const key in params) {
                if (params.hasOwnProperty(key)) {
                    const val = params[key];
                    params.set(key, val);
                }
            }

            (options as any).search = params;
        }

        return this.httpClient
            .delete<T>(`${API_URL}/${url}`, options)
            .pipe(catchError((error) => this.handleError(error, url)));
    }

    private handleError(response: HttpErrorResponse, requestUrl?: string) {
        //
        if (response.status === 403) {
            return throwError('Permission Denied');
        }
        //
        if (response.status === 500) {
            let error = response.error ? response.error.message : response.statusText;
            if (!error) {
                error = 'Internal Server Error';
            }
            AppNotify.error(error);
            return throwError(response);
        }
        //
        let messageError = '';
        if (response.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', response.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${response.status}, ` +
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                `body was: ${response.error}`);
        }

        if (!!response.error && !!response.error.message) {
            messageError = response.error.message;
        } else {
            messageError = 'Something Bad Happened';
        }

        AppNotify.error(messageError);

        // return an observable with a user-facing error message
        return throwError(messageError);
    }

    #region //
    navigateToForbidden() {
        this.router.navigate([AppUrl.Forbidden]);
    }

    navigateToLogin(callbackUrl = false) {
        let pathname = window.location.pathname;
        if (pathname === '/' || pathname === '/login') {
            pathname = null;
        }
        //
        //
        if (pathname && callbackUrl === true) {
            // window.location.href = `${AppUrl.Login}?callback=${callback}`;
            this.router.navigate([`/${AppUrl.Login}`], {
                queryParams: {callback: encodeURIComponent(window.location.href)}
            });
        } else {
            // window.location.href = `${AppUrl.Login}`;
            this.router.navigate([`/${AppUrl.Login}`]);
        }
    }
    #endregion
}
