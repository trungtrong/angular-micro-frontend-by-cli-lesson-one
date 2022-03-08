import {Injectable} from '@angular/core';
import {
    CanActivate, Router, ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import {ApiService, AuthenticationService} from '../services';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router,
                private authService: AuthenticationService,
                private apiService: ApiService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.isLoggedIn();
    }

    private isLoggedIn(): boolean {
        if (this.authService.isLoggedIn()) {
            return true;
        }
        //
        this.authService.removeCurrentUser(false);
        this.apiService.navigateToLogin(true);
        return false;
    }
}
