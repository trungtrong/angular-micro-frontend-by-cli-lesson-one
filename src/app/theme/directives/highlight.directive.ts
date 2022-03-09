import {
    Directive,
    ElementRef,
    HostBinding,
    OnInit
} from '@angular/core';

@Directive({
    selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit {
    @HostBinding('style.backgroundColor') backgroundColor: string | undefined;

    constructor(el: ElementRef) {
        console.log(el);
    }

    ngOnInit() {
        this.backgroundColor = 'yellow';
    }
}
