import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Meta} from '@angular/platform-browser';

import {HeaderComponent} from '../../components/header/header.component';
import {FooterComponent} from '../../components/footer/footer.component';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
})
export class NotificationComponent {
  constructor(private metaService: Meta) {}

  notifications = [
    {
      id: 1,
      title: 'test',
      date: '12 kwiecień 2025 o 12:47',
      icon: '/assets/svg/notification-check.svg',
    },
    {
      id: 2,
      title: 'test',
      description: 'test',
      date: '12 kwiecień 2025 o 12:47',
      icon: '/assets/svg/alert.svg',
    },
    {
      id: 3,
      title: 'test',
      description: 'test',
      date: '12 kwiecień 2025 o 12:47',
      icon: '/assets/svg/rejected.svg',
    },
    {
      id: 4,
      title: 'test',
      date: '12 kwiecień 2025 o 12:47',
      icon: '/assets/svg/notification-check.svg',
    },
  ];

  ngOnInit(): void {
    this.metaService.updateTag({name: 'theme-color', content: '#fff'});
    window.scrollTo(0, 0);
  }
}
