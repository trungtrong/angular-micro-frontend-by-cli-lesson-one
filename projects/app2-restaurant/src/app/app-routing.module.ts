import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//
import {FileType, MfeUtil} from "@utils";

export const mfe = new MfeUtil();


const routes: Routes = [
    {
        path: 'restaurants',
        loadChildren: () => import('./restaurant/restaurant.module').then(m => m.RestaurantModule),
    },
    {
        path: '',
        component: await mfe.loadRemoteFile({
            remoteName: 'home',
            remoteEntry: `http://localhost:4203/remoteHome.js`,
            exposedFile: "HomeComponent",
            exposeFileType: FileType.Component,
        }).then((m) => m.HomeComponent),
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

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
