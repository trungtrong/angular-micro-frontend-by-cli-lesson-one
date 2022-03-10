import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'lib-utils',
    templateUrl: './utils.component.html',
    styleUrls: ['./utils.component.scss']
})
export class UtilsComponent implements OnInit {
    showMobileMenu: boolean = false;

    constructor() { }

    ngOnInit(): void {
    }

}
