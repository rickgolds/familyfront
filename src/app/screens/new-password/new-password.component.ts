import {Component} from '@angular/core';
import {Meta} from '@angular/platform-browser';

import {HeaderComponent} from '../../components/header/header.component';
import {ButtonComponent} from '../../components/button/button.component';
import {InputFieldComponent} from '../../components/input-field/input-field.component';

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [HeaderComponent, InputFieldComponent, ButtonComponent],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.scss',
})
export class NewPasswordComponent {
  constructor(private metaService: Meta) {}

  ngOnInit(): void {
    this.metaService.updateTag({name: 'theme-color', content: '#fff'});
    window.scrollTo(0, 0);
  }
}
