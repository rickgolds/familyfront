import {filter} from 'rxjs/operators';
import {RouterLink} from '@angular/router';
import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {Location, CommonModule} from '@angular/common';
import {Subscription} from 'rxjs';
import {AuthService} from '../../auth.service'; // Zaimportuj AuthService

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private previousUrl: string = '';
  private userSubscription: Subscription; // Subskrypcja na dane użytkownika

  @Input() title: string = '';
  @Input() user: boolean = false;
  @Input() showCard: boolean = false;
  @Input() showGoBack: boolean = false;
  @Input() showDocument: boolean = false;
  @Input() showUserButton: boolean = false;

  currentUser: any = null; // Przechowuj dane zalogowanego użytkownika

  constructor(
    private location: Location,
    private router: Router,
    private authService: AuthService // Wstrzyknij AuthService
  ) {
    // Subskrybuj dane użytkownika
    this.userSubscription = this.authService.user$.subscribe((user) => {
      this.currentUser = user; // Zaktualizuj dane użytkownika
    });
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.previousUrl = event.url;
      });
  }

  ngOnDestroy(): void {
    // Wyczyść subskrypcję, aby uniknąć wycieków pamięci
    this.userSubscription.unsubscribe();
  }

  goBack(): void {
    this.location.back();
  }

  canGoBack(): boolean {
    return this.previousUrl !== this.location.path();
  }
}
