import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';
import {Meta} from '@angular/platform-browser';

import {FooterComponent} from '../../components/footer/footer.component';
import {HeaderComponent} from '../../components/header/header.component';

@Component({
  selector: 'app-more',
  standalone: true,
  imports: [CommonModule, RouterLink, FooterComponent, HeaderComponent],
  templateUrl: './more.component.html',
  styleUrl: './more.component.scss',
})
export class MoreComponent {
  menuItems = [
    // {
    //   id: 1,
    //   title: 'Add new card',
    //   route: '/open-new-card',
    //   icon: '/assets/svg/credit-card.svg',
    // },
    // {
    //   id: 2,
    //   title: 'Create invoice',
    //   route: '/create-invoice',
    //   icon: '/assets/svg/edit.svg',
    // },
    // {
    //   id: 3,
    //   title: 'Statistics',
    //   route: '/statistics',
    //   icon: '/assets/svg/bar-chart.svg',
    // },
    // {
    //   id: 4,
    //   title: 'Scanner QR',
    //   route: 'profile',
    //   icon: '/assets/svg/maximize.svg',
    // },
    // {
    //   id: 5,
    //   title: 'FAQ',
    //   route: '/faq',
    //   icon: '/assets/svg/help-circle.svg',
    // },
    {
      id: 6,
      title: 'Support',
      route: '',
      icon: '/assets/svg/message-square.svg',
    },
    // {
    //   id: 7,
    //   title: 'Charity',
    //   route: '/create-invoice',
    //   icon: '/assets/svg/heart.svg',
    // },
    {
      id: 8,
      title: 'Privacy policy',
      route: '/privacy-policy',
      icon: '/assets/svg/file-text.svg',
    },
  ];

  constructor(private metaService: Meta) {}

  ngOnInit(): void {
    this.metaService.updateTag({name: 'theme-color', content: '#fff'});
    window.scrollTo(0, 0);
  }
}
