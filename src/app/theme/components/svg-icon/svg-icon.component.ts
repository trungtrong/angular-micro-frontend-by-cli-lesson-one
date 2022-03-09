import { DOCUMENT } from '@angular/common';
import {Component, ElementRef,  Inject,  Input,  OnInit, Optional, ChangeDetectionStrategy, HostBinding} from '@angular/core';
//
import { SvgIconsRegistry } from '@app/core/services';

@Component({
    selector: 'app-svg-icon',
    template: '<ng-content></ng-content>',
    styleUrls: ['./svg-icon.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SvgIconComponent implements OnInit {
    @HostBinding('style.width') _widthProperty: string | undefined;
    @HostBinding('style.color') _colorProperty: string | undefined;

    private _name: string | undefined;
    @Input()
    get name(): string | undefined {
        return this._name;
    }

    set name(value: string | undefined) {
        this._name = value;
        //
        this.generateIcon();
    }

    private _data: string | undefined;
    @Input()
    get data(): string | undefined {
        return this._data;
    }
    set data(data: string | undefined) {
        this._data = data;
        //
        this.generateIcon();
    }


    // Style
    @Input()
    set width(value: number) {
        this._widthProperty = value.toString() + 'px' ?? null;
    }

    @Input()
    set color(value: string) {
        this._colorProperty = value ?? null;
    }

    private _svgIcon: SVGElement | undefined;

    constructor(private _elementRef: ElementRef,
                private _svgIconRegistry: SvgIconsRegistry,
                @Optional() @Inject(DOCUMENT) private _document: any ) {

    }

    ngOnInit() {
        console.log();
    }

    private generateIcon() {
        if (this._svgIcon) {
            this._elementRef.nativeElement.removeChild(this._svgIcon);
        }
        //
        const svgData: string | null | undefined = !!this.name
            ? this._svgIconRegistry.getIcon(this.name)
            : this.data
                ? this.data : null;
        //
        this._svgIcon = this.svgElementFromString(svgData);
        this._elementRef.nativeElement.appendChild(this._svgIcon);
    }

    private svgElementFromString(svgContent: string | null | undefined): SVGElement {
        if (!svgContent) {
            return this._document.createElementNS('http://www.w3.org/2000/svg', 'path');
        }
        //
        const div = this._document.createElement('div');
        div.innerHTML = svgContent;
        return div.querySelector('svg')
                || this._document.createElementNS('http://www.w3.org/2000/svg', 'path');
    }
}
