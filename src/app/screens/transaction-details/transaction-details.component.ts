import {Component} from '@angular/core';
import {Meta} from '@angular/platform-browser';
import {HeaderComponent} from '../../components/header/header.component';
import {ButtonComponent} from '../../components/button/button.component';

@Component({
  selector: 'app-transaction-details',
  standalone: true,
  imports: [HeaderComponent, ButtonComponent],
  templateUrl: './transaction-details.component.html',
  styleUrl: './transaction-details.component.scss',
})
export class TransactionDetailsComponent {
  constructor(private metaService: Meta) {}

  ngOnInit(): void {
    this.metaService.updateTag({name: 'theme-color', content: '#fff'});
    window.scrollTo(0, 0);
  }
}
