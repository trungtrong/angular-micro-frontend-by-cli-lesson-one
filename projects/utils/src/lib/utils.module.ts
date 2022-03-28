import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { QuicklinkModule } from 'ngx-quicklink';
//
import { UtilsComponent } from './utils.component';

@NgModule({
    declarations: [
        UtilsComponent
    ],
    imports: [
        RouterModule,
        QuicklinkModule,
    ],
    exports: [
        UtilsComponent
    ]
})
export class UtilsModule {
}
