import {Component, Input, Output, EventEmitter} from '@angular/core';


@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
    @Output()
    menuToggle = new EventEmitter<boolean>();

    @Input()
    menuToggleEnabled = false;

    constructor() {
    }

    toggleMenu = () => {
        this.menuToggle.emit();
    };
}
