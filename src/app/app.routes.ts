import {Routes} from '@angular/router';

// Screens
import {FaqComponent} from './screens/faq/faq.component';
import {MoreComponent} from './screens/more/more.component';

import {SignInComponent} from './screens/sign-in/sign-in.component';
import {SignUpComponent} from './screens/sign-up/sign-up.component';
import {ProfileComponent} from './screens/profile/profile.component';

import {StatisticsComponent} from './screens/statistics/statistics.component';
import {OnboardingComponent} from './screens/onboarding/onboarding.component';

import {NewPasswordComponent} from './screens/new-password/new-password.component';

import {NotificationComponent} from './screens/notification/notification.component';

import {TabNavigatorComponent} from './screens/tab-navigator/tab-navigator.component';

import {TopUpPaymentComponent} from './screens/top-up-payment/top-up-payment.component';

import {PrivacyPolicyComponent} from './screens/privacy-policy/privacy-policy.component';

import {ForgotPasswordComponent} from './screens/forgot-password/forgot-password.component';
import {ConfirmationCodeComponent} from './screens/confirmation-code/confirmation-code.component';
import {EditPersonalInfoComponent} from './screens/edit-personal-info/edit-personal-info.component';
import {TransactionDetailsComponent} from './screens/transaction-details/transaction-details.component';
import {SignUpAccountCreatedComponent} from './screens/sign-up-account-created/sign-up-account-created.component';
import {VerifyYourPhoneNumberComponent} from './screens/verify-your-phone-number/verify-your-phone-number.component';
import {ForgotPasswordSentEmailComponent} from './screens/forgot-password-sent-email/forgot-password-sent-email.component';

export const routes: Routes = [
  {
    path: '',
    component: SignInComponent,
  },
  {
    path: 'sign-in',
    component: SignInComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'new-password',
    component: NewPasswordComponent,
  },
  {
    path: 'forgot-password-sent-email',
    component: ForgotPasswordSentEmailComponent,
  },
  {
    path: 'sign-up-account-created',
    component: SignUpAccountCreatedComponent,
  },
  {
    path: 'verify-your-phone-number',
    component: VerifyYourPhoneNumberComponent,
  },
  {
    path: 'confirmation-code',
    component: ConfirmationCodeComponent,
  },
  {
    path: 'tab-navigator',
    component: TabNavigatorComponent,
  },

  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'transaction-details',
    component: TransactionDetailsComponent,
  },

  {
    path: 'top-up-payment',
    component: TopUpPaymentComponent,
  },

  {
    path: 'edit-personal-info',
    component: EditPersonalInfoComponent,
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
  },
  {
    path: 'faq',
    component: FaqComponent,
  },
  {
    path: 'statistics',
    component: StatisticsComponent,
  },

  {
    path: 'more',
    component: MoreComponent,
  },
  {
    path: 'notification',
    component: NotificationComponent,
  },
];
