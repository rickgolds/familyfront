import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() text: string = '';
  @Input() routerLink: string = '';
  @Input() colorScheme: string = 'primary';

  constructor(private router: Router) {}

  onClick() {
    if (this.routerLink) {
      this.router.navigate([this.routerLink]);
    }
  }
}
