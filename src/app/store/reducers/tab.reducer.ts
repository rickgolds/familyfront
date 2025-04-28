import {createReducer, on} from '@ngrx/store';
import {setScreen} from '../actions/tab.actions';

export interface TabState {
  screen: string;
}

const initialState: TabState = {
  screen: 'deposits',
};

export const tabReducer = createReducer(
  initialState,
  on(setScreen, (state, {screen}) => ({...state, screen}))
);
