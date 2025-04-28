import {Observable} from 'rxjs';
import {Component} from '@angular/core';
import {Store, select} from '@ngrx/store';
import {CommonModule} from '@angular/common';

import {AppState} from '../../store/app.state';
import {setScreen} from '../../store/actions/tab.actions';
import {selectCurrentScreen} from '../../store/selectors/tab.selectors';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  tabs = [
    {
      id: 1,
      route: 'dashboard',
      activeIcon: '/assets/svg/dashboard-active.svg',
      inactiveIcon: '/assets/svg/dashboard-inactive.svg',
    },
    {
      id: 2,
      route: 'deposits',
      activeIcon: '/assets/svg/list-active.svg',
      inactiveIcon: '/assets/svg/list-inactive.svg',
    },
    // {
    //   id: 3,
    //   route: 'loans',
    //   activeIcon: '/assets/svg/loans-active.svg',
    //   inactiveIcon: '/assets/svg/loans-inactive.svg',
    // },
    {
      id: 4,
      route: 'notification',
      activeIcon: '/assets/svg/notification-active.svg',
      inactiveIcon: '/assets/svg/notification-inactive.svg',
    },
    {
      id: 5,
      route: 'more',
      activeIcon: '/assets/svg/more-active.svg',
      inactiveIcon: '/assets/svg/more-inactive.svg',
    },
  ];

  currentScreen$: Observable<string>;

  constructor(private store: Store<AppState>) {
    this.currentScreen$ = this.store.pipe(select(selectCurrentScreen));
  }

  goToDashboard(): void {
    this.store.dispatch(setScreen({screen: this.tabs[0].route}));
  }

  goToDeposits(): void {
    this.store.dispatch(setScreen({screen: this.tabs[1].route}));
  }

  goToOrder(): void {
    this.store.dispatch(setScreen({screen: this.tabs[2].route}));
  }

  goToWishlist(): void {
    this.store.dispatch(setScreen({screen: this.tabs[3].route}));
  }

  goToProfile(): void {
    this.store.dispatch(setScreen({screen: this.tabs[4].route}));
  }
}
