import {createSelector} from '@ngrx/store';
import {AppState} from '../../store/app.state';

export const selectTabState = (state: AppState) => state.tab;

export const selectCurrentScreen = createSelector(
  selectTabState,
  (tabState) => tabState.screen
);
