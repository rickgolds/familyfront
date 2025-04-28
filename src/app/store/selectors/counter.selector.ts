import {AppState} from '../app.state';
import {createSelector} from '@ngrx/store';

export const selectCounter = (state: AppState) => state.counter;

export const selectCount = createSelector(
  selectCounter,
  (counter) => counter.count
);
