import {createReducer, on} from '@ngrx/store';
import {increment} from '../actions/counter.actions';
import {decrement} from '../actions/counter.actions';
import {reset} from '../actions/counter.actions';

export interface CounterState {
  count: number;
}

export const initialState: CounterState = {
  count: 100,
};

export const counterReducer = createReducer(
  initialState,
  on(increment, (state) => ({...state, count: state.count + 1})),
  on(decrement, (state) => ({...state, count: state.count - 1})),
  on(reset, (state) => ({...state, count: 0}))
);
