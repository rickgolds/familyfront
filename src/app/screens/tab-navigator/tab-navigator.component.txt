import {Observable} from 'rxjs';
import {Store, select} from '@ngrx/store';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {Meta} from '@angular/platform-browser';
import {Component, OnInit} from '@angular/core';

import {AppState} from '../../store/app.state';
import {MoreComponent} from '../more/more.component';

import {setScreen} from '../../store/actions/tab.actions';
import {DepositsComponent} from '../deposits/deposits.component';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {selectCurrentScreen} from '../../store/selectors/tab.selectors';
import {NotificationComponent} from '../notification/notification.component';

@Component({
  selector: 'app-tab-navigator',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MoreComponent,
    DashboardComponent,
    DepositsComponent,
    NotificationComponent,
  ],
  templateUrl: './tab-navigator.component.html',
  styleUrls: ['./tab-navigator.component.scss'],
})
export class TabNavigatorComponent implements OnInit {
  currentScreen$: Observable<string>;

  constructor(private store: Store<AppState>, private metaService: Meta) {
    this.currentScreen$ = this.store.pipe(select(selectCurrentScreen));
  }

  ngOnInit(): void {
    this.store.dispatch(setScreen({screen: 'deposits'}));
    this.currentScreen$.subscribe((screen) => {
      console.log('Current Screen:', screen);
    });
    this.metaService.updateTag({name: 'theme-color', content: '#fff'});
  }

  changeScreen(screen: string) {
    this.store.dispatch(setScreen({screen}));
  }
}
