import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideState, provideStore} from '@ngrx/store';
import {tabReducer} from './store/reducers/tab.reducer';
import {counterReducer} from './store/reducers/counter.reducer';

import {provideHttpClient} from '@angular/common/http'; // Dodaj ten import

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideStore(),
    provideState({name: 'tab', reducer: tabReducer}),
    provideState({name: 'counter', reducer: counterReducer}),
    provideHttpClient(),
  ],
};
