import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-layout-default',
    templateUrl: './default.component.html',
    styleUrls: ['./default.component.scss']
})
export class DefaultLayoutComponent implements OnInit, OnDestroy {
    selectedRoute = '';
    menuOpened = true;
    temporaryMenuOpened = false;

    menuMode = 'shrink';
    menuRevealMode = 'expand';
    minMenuSize = 0;
    shaderEnabled = false;
    subscription: Subscription = new Subscription();

    constructor(private router: Router) {
    }

    ngOnInit() {
        console.log();
    }

    toggleMenu() {
        this.menuOpened = !this.menuOpened;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}

