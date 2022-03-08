import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate, UrlTree } from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';

export interface CheckDeactivate {
    canDeactivate(
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;
}

@Injectable({
    providedIn: 'root'
})
export class CanDeactiveGuard implements CanDeactivate<CheckDeactivate> {
    private _pageFormChanged: BehaviorSubject<boolean> = new BehaviorSubject(false);

    canDeactivate(
        component: CheckDeactivate,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return component.canDeactivate ? component.canDeactivate(currentRoute, currentState, nextState) : true;
    }

    get pageFormChanged$(): Observable<boolean> {
        return this._pageFormChanged.asObservable();
    }

    setPageFormChanged(user: boolean) {
        this._pageFormChanged.next(user);
    }

    get isPageFormChanged(): boolean {
        return this._pageFormChanged.getValue();
    }
}
