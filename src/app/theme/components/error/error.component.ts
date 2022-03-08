import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../core/services';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
    constructor(private authenticationService: AuthenticationService) {
    }

    // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
    ngOnInit() {
    }

    logout(e) {
        e.stopPropagation();
        e.preventDefault();
        this.authenticationService.logout();
    }
}
