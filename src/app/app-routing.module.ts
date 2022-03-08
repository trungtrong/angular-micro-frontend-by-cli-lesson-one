import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { QuicklinkStrategy } from 'ngx-quicklink';
//
import { DefaultLayoutComponent, ErrorComponent } from './theme';
import { AuthGuard } from '@app/core/guards';
import { CustomPreloadStrategyService } from '@app/core/services';

const routes: Routes = [
    {
        path: 'home',

        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
    },
    {
        path: 'restaurants',
        loadChildren: () => import('./modules/restaurant/restaurant.module').then(m => m.RestaurantModule),
    },
    {
        path: 'order',
        loadChildren: () => import('./modules/order/order.module').then(m => m.OrderModule),
    },
    {
        path: '', redirectTo: 'home', pathMatch: 'full'
    },
    { path: '**', component: ErrorComponent } // PageNotFoundComponent
];

const config: ExtraOptions = {
    useHash: false,
    preloadingStrategy: QuicklinkStrategy,
    relativeLinkResolution: 'corrected',
    scrollPositionRestoration: "enabled"
};

@NgModule({
    imports: [RouterModule.forRoot(routes, config)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
