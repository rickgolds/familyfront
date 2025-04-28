import {Component} from '@angular/core';
import {Meta} from '@angular/platform-browser';

import {HeaderComponent} from '../../components/header/header.component';
import {ButtonComponent} from '../../components/button/button.component';
import {InputFieldComponent} from '../../components/input-field/input-field.component';

@Component({
  selector: 'app-verify-your-phone-number',
  standalone: true,
  imports: [HeaderComponent, InputFieldComponent, ButtonComponent],
  templateUrl: './verify-your-phone-number.component.html',
  styleUrl: './verify-your-phone-number.component.scss',
})
export class VerifyYourPhoneNumberComponent {
  constructor(private metaService: Meta) {}

  ngOnInit(): void {
    this.metaService.updateTag({name: 'theme-color', content: '#fff'});
    window.scrollTo(0, 0);
  }
}
