import {Component} from '@angular/core';
import {Meta} from '@angular/platform-browser';

import {ButtonComponent} from '../../components/button/button.component';

@Component({
  selector: 'app-forgot-password-sent-email',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './forgot-password-sent-email.component.html',
  styleUrl: './forgot-password-sent-email.component.scss',
})
export class ForgotPasswordSentEmailComponent {
  constructor(private metaService: Meta) {}

  ngOnInit(): void {
    this.metaService.updateTag({name: 'theme-color', content: '#fff'});
    window.scrollTo(0, 0);
  }
}
