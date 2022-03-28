import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
//
import { FileType, MfeUtil } from "@utils";
import { QuicklinkStrategy } from 'ngx-quicklink';

const routes: Routes = [
    {
        path: '',
        component: await new MfeUtil().loadRemoteFile({
            remoteName: "home",
            remoteEntry: `http://localhost:4200/remoteHome.js`,
            exposedFile: "HomeComponent",
            exposeFileType: FileType.Component,
        }).then((m) => m.HomeComponent),
    },
    {
        path: 'restaurants',
        loadChildren: () => new MfeUtil().loadRemoteFile({
            remoteName: "restaurant",
            remoteEntry: `http://localhost:4204/remoteRestaurant.js`,
            exposedFile: "RestaurantModule",
            exposeFileType: FileType.Module
        }).then((m) => m.RestaurantModule),
    },
    {
        path: 'order',
        loadChildren: () => import('./order/order.module').then(m => m.OrderModule),
    },
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
