import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterModule } from '@angular/router';
//
import { HeaderComponent } from './header/header.component';

const COMPONENTS = [
    HeaderComponent
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        ...COMPONENTS
    ],
    providers: [
    ]
})
export class CoreModule {
}
