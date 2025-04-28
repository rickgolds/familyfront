import {Component} from '@angular/core';
import {Meta} from '@angular/platform-browser';

import {HeaderComponent} from '../../components/header/header.component';
import {ButtonComponent} from '../../components/button/button.component';
import {InputFieldComponent} from '../../components/input-field/input-field.component';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [HeaderComponent, ButtonComponent, InputFieldComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  constructor(private metaService: Meta) {}

  ngOnInit() {
    this.metaService.updateTag({name: 'theme-color', content: '#fff'});
    window.scrollTo(0, 0);
  }
}
