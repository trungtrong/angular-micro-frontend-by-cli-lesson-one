import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//
import { UtilsModule } from '@utils';
import { QuicklinkModule } from 'ngx-quicklink';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        //
        QuicklinkModule,
        //
        AppRoutingModule,
        UtilsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
