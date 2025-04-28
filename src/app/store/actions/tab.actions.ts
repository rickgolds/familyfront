import {createAction, props} from '@ngrx/store';

export const setScreen = createAction(
  '[Tab] Set Screen',
  props<{screen: string}>()
);
