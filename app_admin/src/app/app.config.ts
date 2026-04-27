import { ApplicationConfig, provideBrowserGlobalErrorListeners, Provider } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';


import { routes } from './app.routes';
import { JwtInterceptor } from './utils/jwt-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
};


export const authInterceptProvider: Provider =
{ provide: HTTP_INTERCEPTORS,
  useClass: JwtInterceptor, multi: true };

