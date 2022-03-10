import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { QuicklinkStrategy } from 'ngx-quicklink';
//
import { FileType, MfeUtil } from '@utils';
//
import { ErrorComponent } from './theme';

export const mef = new MfeUtil();

const routes: Routes = [
    {
        path: 'home',

        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
    },
    // Update the Routes to use the federated module and components:
    {
        path: 'restaurants',
        loadChildren: () => mef.loadRemoteFile({
            remoteName: "restaurant",
            remoteEntry: `http://localhost:4204/remoteRestaurant.js`,
            exposedFile: "RestaurantModule",
            exposeFileType: FileType.Module
        }).then((m) => m.RestaurantModule),
    },
    {
        path: 'order',
        loadChildren: () => mef.loadRemoteFile({
            remoteName: "orders",
            remoteEntry: `http://localhost:4205/remoteOrders.js`,
            exposedFile: "OrderModule",
            exposeFileType: FileType.Module
        }).then((m) => m.OrderModule),
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
