import { DOCUMENT } from '@angular/common';
import {
    AfterViewInit,
    NgZone,
    Directive,
    ElementRef,
    OnInit,
    Inject,
    Optional,
    Output,
    EventEmitter,
    OnDestroy
} from '@angular/core';
import { Subscription, merge, fromEvent } from 'rxjs';

@Directive({
    selector: '[appClickOutside]',
})
export class ClickOutsideDirective implements OnInit, AfterViewInit, OnDestroy {
    @Output() clickOutside: EventEmitter<void> = new EventEmitter<void>();

    private _subscription: Subscription = Subscription.EMPTY;

    constructor(@Optional() @Inject(DOCUMENT) private _document: any,
                private _zone: NgZone,
                private _elementRef: ElementRef) {
    }

    ngOnInit() {
        console.log();
    }

    ngAfterViewInit() {
        this._setUpClickOutsideListener();
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }

    private _setUpClickOutsideListener() {
        this._zone.runOutsideAngular(() => {
            this._subscription = merge(
                fromEvent(this._document, 'click') ,
                fromEvent(this._document, 'auxclick') ,
                fromEvent(this._document, 'touchend')
            ).subscribe((event: MouseEvent | TouchEvent) => {
                const currentTarget: EventTarget = event.target;
                //
                if (!!currentTarget
                    && (currentTarget === this._elementRef.nativeElement || this._elementRef.nativeElement.contains(currentTarget))) {
                    return;
                }
                //
                this.clickOutside.emit();
            });
        });
    }
}
