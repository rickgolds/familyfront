import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-switcher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './switcher.component.html',
  styleUrl: './switcher.component.scss',
})
export class SwitcherComponent {
  on = true;

  toggle() {
    this.on = !this.on;
  }
}
