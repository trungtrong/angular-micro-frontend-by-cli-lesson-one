import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {AuthenticationService} from '../../../core/services';
import {UserModel} from '../../../models/shared';


@Component({
    selector: 'app-user-panel',
    templateUrl: 'user-panel.component.html',
    styleUrls: ['./user-panel.component.scss']
})

export class UserPanelComponent implements OnInit, OnDestroy {
    menuItems = [
        {
            text: 'Profile',
            icon: 'user'
        },
        {
            text: 'Logout',
            icon: 'runner',
            onClick: () => {
            }
        }
    ];

    currentUser: UserModel = new UserModel();
    subscription: Subscription = new Subscription();

    isOpenMenu = false;

    constructor(private authService: AuthenticationService) {
    }

    ngOnInit() {
        this.subscription.add(this.authService.currentUser.subscribe((user) => {
            this.currentUser = user;
        }));
    }

    logOut() {
        this.authService.logout();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
