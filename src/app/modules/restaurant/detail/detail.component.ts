import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
})
export class RestaurantDetailComponent implements OnInit {

    vars = {
        str: 'h1-teer',
        str2: 'h1-teer',
    };

    constructor() { }

    // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
    ngOnInit(): void {
    }

}
