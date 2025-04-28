import {RouterOutlet} from '@angular/router';
import {Meta} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  host: {class: 'app'},
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  title = 'apitex';
  currentRoute: string = '';

  constructor(private router: Router, private metaService: Meta) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
        this.updateStylesBasedOnRoute();
      }
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateThemeColor(event.urlAfterRedirects);
      }
    });
  }

  updateStylesBasedOnRoute() {
    const appElement = document.querySelector('.app');
    if (appElement) {
      if (this.currentRoute.includes('/')) {
        appElement.classList.add('main-dark-color');
      } else {
        appElement.classList.remove('white-color');
      }
    }
  }

  updateThemeColor(url: string) {
    let themeColor = '#fff'; // Default color

    if (url.includes('/sign-in')) {
      themeColor = '#fff'; // Color for onboarding screen
    }

    this.metaService.updateTag({name: 'theme-color', content: themeColor});
    console.log(`Theme color updated to ${themeColor}`);
  }
}
