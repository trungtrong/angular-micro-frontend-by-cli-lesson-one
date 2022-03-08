import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Observable, ReplaySubject, of} from 'rxjs';
//
import {LoggedUserService} from './logged-user.service';
import {UserModel, AccessTokenResponse, LoginModel} from '@app/models/shared';
import {ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY} from '@app/shared/constants';
import {API_ENDPOINT} from '../../utilities/endpoints';
import {ApiService} from './api.service';
import {AppStorage} from '@app/utilities';
import {randomLoggedUser, randomRefreshToken} from '@app/data/auth';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private isRefreshingToken = false;

    constructor(private router: Router,
                private jwtHelperService: JwtHelperService,
                private apiService: ApiService,
                private loggedUserService: LoggedUserService) {
    }

    get currentUser(): Observable<UserModel> {
        return this.loggedUserService.currentUser;
    }

    get loggedUser(): UserModel {
        return this.loggedUserService.loggedUser;
    }

    removeTokens() {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
    }

    isLoggedIn(): boolean {
        return !!this.apiService.accessToken;
    }

    login(params: LoginModel): Observable<UserModel> {
        return of(randomLoggedUser());
        this.apiService.get('refesh').subscribe((data) => {

        });
    }

    setCurrentUser(user: UserModel) {
        this.loggedUserService.setLoggedUser(user);
        // TODO: Set other data (localStorage, Avatar, Permissions, etc)

        AppStorage.storeTokenData(ACCESS_TOKEN_KEY, user.accessToken);
        AppStorage.storeTokenData(REFRESH_TOKEN_KEY, user.refreshToken);
    }

    removeCurrentUser(navigateToLogin = true) {
        //
        this.loggedUserService.setLoggedUser(null);
        //
        this.removeTokens();
        // BroadCast ?

        //
        if (navigateToLogin) {
            this.apiService.navigateToLogin();
        }
    }

    logout() {
        this.apiService.get(`${API_ENDPOINT.Auth}/logout`).toPromise().then();
        //
        this.removeCurrentUser();
    }
}
