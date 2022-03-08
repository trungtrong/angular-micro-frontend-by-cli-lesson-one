import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {AppNotify} from '@app/utilities';

@Injectable()
export class ClientErrorHandler implements ErrorHandler {
    // https://indepth.dev/posts/1074/expecting-the-unexpected-best-practices-for-error-handling-in-angular
    /**
     - Since error handling is essential, it gets loaded first
     // - b/c of this, we can't use Dependency Injection in the constructor for the services
     - We have to inject then manually with Injector
     */
    constructor(private injector: Injector) {
    }

    handleError(error: any) {
        // No internet connection
        if (!navigator.onLine) {
            AppNotify.error('No Internet Connection');
            // console.error(error);
            return;
        }

        // Handle Client Error (Angular Error, ReferenceError...)
        if (error.error instanceof ErrorEvent) {
            const messageError = error.message ? error.message : error.toString();
            AppNotify.error(messageError);
            // Log the error anyway
            console.error(error.message);
        }
    }
}
