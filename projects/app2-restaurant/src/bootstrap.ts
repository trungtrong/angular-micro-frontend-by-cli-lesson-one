import { enableProdMode, InjectionToken } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { BaseService } from '@utils';

if (environment.production) {
  enableProdMode();
}
//
// const locale = new InjectionToken<string[]>('baseService');
// const providers = [
//     { provide: locale, useExisting: BaseService, multi: true },
// ];
// //
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
