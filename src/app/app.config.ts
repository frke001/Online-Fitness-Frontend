import { ApplicationConfig, ErrorHandler } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { jwtTokenInterceptorInterceptor } from './interceptors/jwt-token-interceptor.interceptor';
import { GlobalErrorHandler } from '../global-error-handler';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(), 
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
    provideHttpClient(withInterceptors([
    jwtTokenInterceptorInterceptor
  ])),]
};
