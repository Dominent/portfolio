import { enableProdMode } from '@angular/core';

import { environment } from './environments/environment';

if (environment.PRODUCTION) {
  enableProdMode();
}

export { AppServerModule } from './app/app.server.module';
export { ngExpressEngine } from "@nguniversal/express-engine";


export { renderModule, renderModuleFactory } from '@angular/platform-server';