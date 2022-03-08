import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, EMPTY, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthPageResolver implements Resolve<void> {
    constructor() {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        // return EMPTY; -> Can't navigate
        return of(null); // Can navigate
    }
}
