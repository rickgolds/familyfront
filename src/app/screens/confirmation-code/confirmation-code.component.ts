import {Component} from '@angular/core';
import {Meta} from '@angular/platform-browser';

import {HeaderComponent} from '../../components/header/header.component';
import {ButtonComponent} from '../../components/button/button.component';

@Component({
  selector: 'app-confirmation-code',
  standalone: true,
  imports: [HeaderComponent, ButtonComponent],
  templateUrl: './confirmation-code.component.html',
  styleUrl: './confirmation-code.component.scss',
})
export class ConfirmationCodeComponent {
  constructor(private metaService: Meta) {}

  ngOnInit() {
    this.metaService.updateTag({name: 'theme-color', content: '#fff'});
    window.scrollTo(0, 0);
  }
}
