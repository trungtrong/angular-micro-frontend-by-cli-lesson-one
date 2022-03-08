import {NgModule, ModuleWithProviders} from '@angular/core';
import {QuicklinkModule} from 'ngx-quicklink';
//
import {ThemeModule} from '@app/theme';

const COMPONENTS = [
];

@NgModule({
    imports: [
        ThemeModule,
        QuicklinkModule
    ],
    exports: [
        QuicklinkModule,
        ...COMPONENTS
    ],
    declarations: [
        ...COMPONENTS
    ],
})
export class SharedModule {
}
