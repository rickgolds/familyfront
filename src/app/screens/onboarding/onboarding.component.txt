import SwiperCore from 'swiper/core';
import {CommonModule} from '@angular/common';
import {Meta} from '@angular/platform-browser';
import {Navigation, Pagination} from 'swiper/modules';
import {Component, OnInit, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import {ButtonComponent} from '../../components/button/button.component';

SwiperCore.use([Navigation, Pagination]);

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './onboarding.component.html',
  styleUrl: './onboarding.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OnboardingComponent implements OnInit {
  onboardingData = [
    {
      id: 1,
      title1: 'Welcome to Apitex',
      title2: 'bank app!',
      descriptionLine1: 'Secure, user-friendly banking app to manage',
      descriptionLine2: 'finances and track transactions.',
      image: '/assets/onboarding/01.png',
    },
    {
      id: 2,
      title1: 'Get a new card in a',
      title2: 'few clicks!',
      image: '/assets/onboarding/02.png',
      descriptionLine1: 'Reliable, easy-to-use banking app with fast',
      descriptionLine2: 'transfers and advanced budgeting features.',
    },
    {
      id: 3,
      title1: 'Easy payments all',
      title2: 'over the world!',
      descriptionLine1: 'User-friendly app for safe banking, offering',
      descriptionLine2: 'instant notifications and expense insights.',
      image: '/assets/onboarding/03.png',
    },
  ];

  activeSlide = 0;

  constructor(private metaService: Meta) {}

  ngOnInit(): void {
    this.metaService.updateTag({name: 'theme-color', content: '#fff'});
    window.scrollTo(0, 0);
  }

  onSlideChange(e: any) {
    const activeIndex = e?.detail?.[0]?.activeIndex;
    this.activeSlide = activeIndex;
  }

  get currentTitle1() {
    return this.onboardingData[this.activeSlide]?.title1 || '';
  }

  get currentTitle2() {
    return this.onboardingData[this.activeSlide]?.title2 || '';
  }

  get descriptionLine1() {
    return this.onboardingData[this.activeSlide]?.descriptionLine1 || '';
  }

  get descriptionLine2() {
    return this.onboardingData[this.activeSlide]?.descriptionLine2 || '';
  }
}
