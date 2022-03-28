import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store ,Select } from '@ngxs/store';
//
import { BaseService } from '@utils';
import { AppLookupSelectors } from './../../../../projects/utils/src/core/store/app-lookup/app-lookup.selector';
import { User } from 'projects/utils/src/public-api';
import * as AppLookupActions from 'projects/utils/src/core/store/app-lookup/app-lookup.actions';

@Component({
    selector: 'pmo-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
    @Select(AppLookupSelectors.getUsers) users$: Observable<User[]>;

    color: string;
    users: User[] = [];

    private _subscription: Subscription = new Subscription();

    constructor(private _store: Store,
                private baseService: BaseService) {
        this._subscription.add(this.users$.subscribe((users: User[]) => {
            this.users = users;
        }))
    }

    ngOnInit(): void {
        this.color = this.baseService.color;
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }
    //
    onChangeColorToBlue() {
        this.baseService.color = 'blue';
    }

    /*
     * Shared Ngxs
     */
    onRemoveUser(user: User) {
        this._store.dispatch(new AppLookupActions.RemoveUser(user));
    }

    onAddUser() {
        const randomId: string = (Math.random() * 100).toString();
        //
        this._store.dispatch(new AppLookupActions.AddUser(new User({
            name: 'User_home_' + randomId,
            email: randomId + 'user@example.com'
        })));
    }
}
