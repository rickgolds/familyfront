import {Component} from '@angular/core';
import {Meta} from '@angular/platform-browser';
import {ButtonComponent} from '../../components/button/button.component';

@Component({
  selector: 'app-sign-up-account-created',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './sign-up-account-created.component.html',
  styleUrl: './sign-up-account-created.component.scss',
})
export class SignUpAccountCreatedComponent {
  constructor(private metaService: Meta) {}

  ngOnInit(): void {
    this.metaService.updateTag({name: 'theme-color', content: '#fff'});
    window.scrollTo(0, 0);
  }
}
