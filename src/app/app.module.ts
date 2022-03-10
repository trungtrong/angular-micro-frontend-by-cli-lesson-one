import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuicklinkModule } from 'ngx-quicklink';
import { JwtInterceptor, JwtModule } from '@auth0/angular-jwt';
// NgRx
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
// Ngxs
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
//
import { UtilsModule } from '@utils';
import { ThemeModule } from './theme';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { CoreModule } from '@app/core/core.module';
//
import { ACCESS_TOKEN_KEY, AUTH_SCHEME } from './shared/constants';
import { AppComponent } from './app.component';
import { environment } from '@environment';
// NgRx Example 3
//
import {
    HttpErrorInterceptor,
    RefreshTokenInterceptor,
    ClientErrorHandler,
    FormatInterceptor,
    ProfilingInterceptor
} from '@app/core/interceptors';

// Step 1: set HTTP INTERCEPTOR
export function accessTokenGetter() {
    return localStorage.getItem(ACCESS_TOKEN_KEY)
        ? decodeURIComponent(atob(localStorage.getItem(ACCESS_TOKEN_KEY))) : null;
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        // HttpClientInMemoryWebApiModule.forRoot(ProductData), // run Memory Data
        BrowserAnimationsModule,
        //
        JwtModule.forRoot({
            config: {
                tokenGetter: accessTokenGetter,
                authScheme: AUTH_SCHEME,
                disallowedRoutes: [
                    new RegExp('\/assets\/.*')
                ]
            }
        }),
        //
        QuicklinkModule,
        CoreModule,
        //
        AppRoutingModule,
        // https://ngrx.io/guide/store/install
        // ng add @ngrx/store@latest
        // Example 1,2
        // StoreModule.forRoot({}),
        //
        // Example 3: Initialize the central store with app's main reducer
        // StoreModule.forRoot(ROOT_REDUCERS),
        /* StoreDevtoolsModule.instrument({
            name: 'Angular In Depth',
            // maximum allowed actions to be stored in the history tree,
            // 0 is infinite
            // default = 25 for performance reasons
            maxAge: 25,
            logOnly: environment.production
        }),*/
        // start monitoring app's side effects
        // EffectsModule.forRoot([]),
        NgxsModule.forRoot([], {
            developmentMode: !environment.production,
            selectorOptions: { injectContainerState: false }
        }),
        NgxsReduxDevtoolsPluginModule.forRoot({
            disabled: environment.production
        }),
        NgxsLoggerPluginModule.forRoot({
            disabled: environment.production
        }),
        UtilsModule
    ],
    providers: [
        JwtInterceptor,
        /* {
            provide: HTTP_INTERCEPTORS,
            useClass: RefreshTokenInterceptor,
            multi: true
        }, */
        {
            provide: HTTP_INTERCEPTORS,
            useClass: FormatInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ProfilingInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorInterceptor,
            multi: true,
        },
        /* {
            provide: ErrorHandler,
            useClass: ClientErrorHandler
        }*/
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
