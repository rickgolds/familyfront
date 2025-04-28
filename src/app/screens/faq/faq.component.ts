import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Meta} from '@angular/platform-browser';

import {HeaderComponent} from '../../components/header/header.component';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
})
export class FaqComponent {
  faq = [
    {
      id: 1,
      title: 'How do I send a wire transfer?',
      description:
        'To send a wire transfer, you need to have a bank account and the recipient’s bank account number. You can send a wire transfer in person at a bank, through an online money transfer service, or over the phone. Wire transfers are a secure way to send money, but they can be expensive. You may also need to pay a fee to receive a wire transfer.',
      isOpen: false,
    },
    {
      id: 2,
      title: 'How to send an invoice?',
      description:
        'To send a wire transfer, you need to have a bank account and the recipient’s bank account number. You can send a wire transfer in person at a bank, through an online money transfer service, or over the phone. Wire transfers are a secure way to send money, but they can be expensive. You may also need to pay a fee to receive a wire transfer.',
      isOpen: false,
    },
    {
      id: 3,
      title: 'How to send a payment request?',
      description:
        'To send a wire transfer, you need to have a bank account and the recipient’s bank account number. You can send a wire transfer in person at a bank, through an online money transfer service, or over the phone. Wire transfers are a secure way to send money, but they can be expensive. You may also need to pay a fee to receive a wire transfer.',
      isOpen: false,
    },
    {
      id: 4,
      title: 'Can I send money to a friend?',
      description:
        'To send a wire transfer, you need to have a bank account and the recipient’s bank account number. You can send a wire transfer in person at a bank, through an online money transfer service, or over the phone. Wire transfers are a secure way to send money, but they can be expensive. You may also need to pay a fee to receive a wire transfer.',
      isOpen: false,
    },
    {
      id: 5,
      title: 'What is a wire transfer?',
      description:
        'To send a wire transfer, you need to have a bank account and the recipient’s bank account number. You can send a wire transfer in person at a bank, through an online money transfer service, or over the phone. Wire transfers are a secure way to send money, but they can be expensive. You may also need to pay a fee to receive a wire transfer.',
      isOpen: false,
    },
  ];

  constructor(private metaService: Meta) {}

  toggleItem(item: any) {
    item.isOpen = !item.isOpen;
  }

  ngOnInit(): void {
    this.metaService.updateTag({name: 'theme-color', content: '#fff'});
    window.scrollTo(0, 0);
  }
}
