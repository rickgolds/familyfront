import {Component, OnInit, OnDestroy} from '@angular/core';
import {RouterLink, Router} from '@angular/router'; // Dodaj Router
import {Meta} from '@angular/platform-browser';
import {Subscription} from 'rxjs'; // Dodaj Subscription
import {AuthService} from '../../auth.service'; // Zaimportuj AuthService
import {HeaderComponent} from '../../components/header/header.component';
import {ButtonComponent} from '../../components/button/button.component';
import {SwitcherComponent} from '../../components/switcher/switcher.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HeaderComponent, ButtonComponent, RouterLink, SwitcherComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit, OnDestroy {
  currentUser: any = null; // Przechowuj dane zalogowanego użytkownika
  private userSubscription: Subscription; // Subskrypcja na dane użytkownika

  constructor(
    private metaService: Meta,
    private authService: AuthService, // Wstrzyknij AuthService
    private router: Router // Wstrzyknij Router
  ) {
    // Subskrybuj dane użytkownika
    this.userSubscription = this.authService.user$.subscribe((user) => {
      this.currentUser = user;
    });
  }

  ngOnInit(): void {
    this.metaService.updateTag({name: 'theme-color', content: '#fff'});
    window.scrollTo(0, 0);
  }

  ngOnDestroy(): void {
    // Wyczyść subskrypcję, aby uniknąć wycieków pamięci
    this.userSubscription.unsubscribe();
  }

  logout(): void {
    this.authService.logout(); // Wywołaj metodę logout z AuthService
    this.router.navigate(['/sign-in']); // Przekieruj na stronę logowania
  }
}
