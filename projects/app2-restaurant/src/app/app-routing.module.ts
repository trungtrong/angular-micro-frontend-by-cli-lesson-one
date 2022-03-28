import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
//
import {FileType, MfeUtil} from "@utils";
import { QuicklinkStrategy } from 'ngx-quicklink';

export const mfe = new MfeUtil();


const routes: Routes = [
    {
        path: '',
        component: await mfe.loadRemoteFile({
            remoteName: 'home',
            remoteEntry: `http://localhost:4200/remoteHome.js`,
            exposedFile: "HomeComponent",
            exposeFileType: FileType.Component,
        }).then((m) => m.HomeComponent),
    },
    {
        path: 'restaurants',
        loadChildren: () => import('./restaurant/restaurant.module').then(m => m.RestaurantModule),
    },
    {
        path: 'order',
        loadChildren: () => mfe.loadRemoteFile({
            remoteName: "orders",
            remoteEntry: `http://localhost:4205/remoteOrders.js`,
            exposedFile: "OrderModule",
            exposeFileType: FileType.Module
        }).then((m) => m.OrderModule),
    }
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
export class AppRoutingModule { }
