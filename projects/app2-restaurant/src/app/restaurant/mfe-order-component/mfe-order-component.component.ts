import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { mfe } from "../../app-routing.module";
import { FileType } from "@utils";

@Component({
    selector: 'pmo-mfe-order-component',
    templateUrl: './mfe-order-component.component.html',
    styleUrls: ['./mfe-order-component.component.scss']
})
export class MfeOrderComponentComponent implements OnInit {
    /**
     * - Dynamically load the code from the container
     * - Use retrieved code to dynamically create the component - Import the ViewContainerRef and ComponentFactoryResolver
     * => Your dynamically created component is ready to be used anywhere in the app.
     */

    constructor(private viewCRef: ViewContainerRef) { }

    async ngOnInit() {
        const OrderComponent = await mfe.loadRemoteFile({
            remoteName: "orders",
            remoteEntry: `http://localhost:4205/remoteOrders.js`,
            exposedFile: "OrderComponent",
            exposeFileType: FileType.Component,
        }).then((m) => m.OrderComponent);

        this.viewCRef.createComponent(OrderComponent);
    }
}
