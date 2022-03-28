import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store ,Select } from '@ngxs/store';
//
import { BaseService } from '@utils';
import { User } from 'projects/utils/src/public-api';
import * as AppLookupActions from 'projects/utils/src/core/store/app-lookup/app-lookup.actions';
import { AppLookupSelectors } from 'projects/utils/src/core/store/app-lookup/app-lookup.selector';

@Component({
    selector: 'app-restaurant',
    templateUrl: './restaurant.component.html',
    styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit, OnDestroy {
    @Select(AppLookupSelectors.getUsers) users$: Observable<User[]>;

    color: string;
    //
    showItems = false;
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
        setTimeout(() => {
            this.showItems = !this.showItems;
        }, 1000);

    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }

    onChangeColorToGreen() {
        this.baseService.color = 'green';
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
            name: 'User_restaurant_' + randomId,
            email: randomId + 'user@example.com'
        })));
    }
}
