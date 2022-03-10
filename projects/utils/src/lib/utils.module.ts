import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
//
import { UtilsComponent } from './utils.component';

@NgModule({
    declarations: [
        UtilsComponent
    ],
    imports: [
        RouterModule,
    ],
    exports: [
        UtilsComponent
    ]
})
export class UtilsModule {
}
