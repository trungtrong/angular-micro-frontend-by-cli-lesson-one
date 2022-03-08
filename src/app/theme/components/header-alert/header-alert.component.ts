import { Component, OnInit } from '@angular/core';
import { AlertModel } from '@app/models/shared';

@Component({
    selector: 'app-header-alert',
    templateUrl: './header-alert.component.html',
    styleUrls: ['./header-alert.component.scss']
})

export class HeaderAlertComponent implements OnInit {

    alerts: AlertModel[] = new Array<AlertModel>();

    constructor() { }

    // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
    ngOnInit() { }
}
