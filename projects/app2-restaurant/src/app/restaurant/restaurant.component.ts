import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-restaurant',
    templateUrl: './restaurant.component.html',
    styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {

    showItems = false;

    constructor() { }

    ngOnInit(): void {
        setTimeout(() => {
            this.showItems = !this.showItems;
        }, 1000);
    }

}
