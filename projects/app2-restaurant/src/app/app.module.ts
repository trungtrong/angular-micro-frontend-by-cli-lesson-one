import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';
//
import { UtilsModule } from '@utils';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserState } from 'projects/utils/src/public-api';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { QuicklinkModule } from 'ngx-quicklink';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        //
        QuicklinkModule,
        //
        NgxsModule.forRoot([UserState], {
            developmentMode: false,
            selectorOptions: { injectContainerState: false }
        }),
        NgxsReduxDevtoolsPluginModule.forRoot({
            disabled: false
        }),
        NgxsLoggerPluginModule.forRoot({
            disabled: false
        }),
        //
        AppRoutingModule,
        UtilsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
