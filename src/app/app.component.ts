import { AfterViewChecked, Component } from '@angular/core';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router, RouterEvent } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewChecked {
    title = 'angular-micro-frontend-by-cli-lesson-one';
    public isShowingRouteLoadIndicator: boolean = false;

    subscriptions: Subscription = new Subscription();

    constructor(private router: Router) {
        this.router.events.subscribe((event: RouterEvent): void => {
            if (event instanceof RouteConfigLoadStart) {
                this.isShowingRouteLoadIndicator = true;
            } else if (event instanceof RouteConfigLoadEnd) {
                this.isShowingRouteLoadIndicator = false;
            }

            // If there is at least one pending asynchronous config load request,
            // then let's show the loading indicator.
            // --
            // CAUTION: I'm using CSS to include a small delay such that this loading
            // indicator won't be seen by people with sufficiently fast connections.
        });
    }

    // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
    ngAfterViewChecked() {
        // console.log('app-root');
    }
}
