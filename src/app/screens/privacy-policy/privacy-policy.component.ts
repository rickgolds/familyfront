import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Meta} from '@angular/platform-browser';

import {HeaderComponent} from '../../components/header/header.component';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss',
})
export class PrivacyPolicyComponent {
  privacyPolicy = [
    {
      id: 1,
      title: '1. Terms',
      description:
        'By accessing this website, you are agreeing to be bound by these website Terms and Conditions of Use, applicable laws and regulations and their compliance. If you disagree with any of the stated terms and conditions, you are prohibited from using or accessing this site. The materials contained in this site are secured by relevant copyright and trademark law.',
    },
    {
      id: 2,
      title: '2. Use Licence',
      description:
        'Permission is allowed to temporarily download one duplicate of the materials (data or programming) on Company is site for individual and non-business use only.  This is just a permit of license and not an exchange of title',
    },
    {
      id: 3,
      title: '3. Disclaimer',
      description:
        'The materials on Company is site are given "as is". Company makes no guarantees, communicated or suggested, and thus renounces and nullifies every single other warranties, including without impediment, inferred guarantees or states of merchantability, fitness for a specific reason, or non-encroachment of licensed property or other infringement of rights. Further, Company does not warrant or make any representations concerning the precision, likely results, or unwavering quality of the utilization of the materials on its Internet site or generally identifying with such materials or on any destinations connected to this website.',
    },
  ];

  constructor(private metaService: Meta) {}

  ngOnInit(): void {
    this.metaService.updateTag({name: 'theme-color', content: '#fff'});
    window.scrollTo(0, 0);
  }
}
