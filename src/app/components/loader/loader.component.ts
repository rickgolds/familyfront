import {Component} from '@angular/core';
import {HeaderComponent} from '../header/header.component';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {}
