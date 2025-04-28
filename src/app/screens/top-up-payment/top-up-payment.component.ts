import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Meta} from '@angular/platform-browser';

import {HeaderComponent} from '../../components/header/header.component';

@Component({
  selector: 'app-top-up-payment',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './top-up-payment.component.html',
  styleUrl: './top-up-payment.component.scss',
})
export class TopUpPaymentComponent {
  cards = [
    {
      id: 1,
      card: '/assets/cards/01.jpg',
      number: '**** **** **** 1234',
      balance: '2 156.35',
    },
  ];

  eAccounts = [
    {
      id: 1,
      card: '/assets/svg/enterpreneur-acc.svg',
      number: 'US**********************4571',
      balance: '2 486.22',
    },
  ];

  methods = [
    {
      id: 1,
      title: 'Card from another bank',
      icon: '/assets/svg/payment-card.svg',
    },
    {
      id: 2,
      title: 'SEPA',
      icon: '/assets/svg/sepa.svg',
    },
    {
      id: 3,
      title: 'Western Union',
      icon: '/assets/svg/wn.svg',
    },
    {
      id: 4,
      title: 'Paypal',
      icon: '/assets/svg/paypal.svg',
    },
    {
      id: 5,
      title: 'Payoneer',
      icon: '/assets/svg/payoneer.svg',
    },
  ];

  selectedMethod: 'card' | 'e-account' | null = null;
  selectedCard: string | null = null;
  selectedEAccount: string | null = null;

  constructor(private metaService: Meta) {}

  ngOnInit(): void {
    this.metaService.updateTag({name: 'theme-color', content: '#fff'});
    window.scrollTo(0, 0);
  }

  selectCard(card: string): void {
    this.selectedMethod = 'card';
    this.selectedCard = card;
  }

  selectEAccount(eAccount: string): void {
    this.selectedMethod = 'e-account';
    this.selectedEAccount = eAccount;
  }
}
