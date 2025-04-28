import {Component} from '@angular/core';
import {Location} from '@angular/common';
import {Meta} from '@angular/platform-browser';

import {HeaderComponent} from '../../components/header/header.component';
import {ButtonComponent} from '../../components/button/button.component';
import {InputFieldComponent} from '../../components/input-field/input-field.component';

@Component({
  selector: 'app-edit-personal-info',
  standalone: true,
  imports: [HeaderComponent, InputFieldComponent, ButtonComponent],
  templateUrl: './edit-personal-info.component.html',
  styleUrl: './edit-personal-info.component.scss',
})
export class EditPersonalInfoComponent {
  constructor(private metaService: Meta, private location: Location) {}

  ngOnInit(): void {
    this.metaService.updateTag({name: 'theme-color', content: '#fff'});
    window.scrollTo(0, 0);
  }

  goBack(): void {
    this.location.back();
  }
}
