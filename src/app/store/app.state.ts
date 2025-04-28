import {TabState} from './reducers/tab.reducer';
import {CounterState} from './reducers/counter.reducer';

export interface AppState {
  tab: TabState;
  counter: CounterState;
}
