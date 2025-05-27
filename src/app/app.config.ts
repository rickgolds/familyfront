import {ApplicationConfig, provideZoneChangeDetection, isDevMode} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideState, provideStore} from '@ngrx/store';
import {tabReducer} from './store/reducers/tab.reducer';
import {counterReducer} from './store/reducers/counter.reducer';

import {provideHttpClient} from '@angular/common/http';
import { provideServiceWorker } from '@angular/service-worker'; // Dodaj ten import

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideStore(),
    provideState({name: 'tab', reducer: tabReducer}),
    provideState({name: 'counter', reducer: counterReducer}),
    provideHttpClient(), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          }),
  ],
};
