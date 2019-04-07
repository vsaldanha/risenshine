import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';
import {LoginComponent} from './views/login/login.component';
import {RegisterComponent} from './views/register/register.component';
import {SchoolComponent} from './views/school/school.component';
import {ConfirmRequestComponent} from './views/organization/confirmRequest.component';
import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'school',
        loadChildren: './views/school/school.module#SchoolModule'
      },
      {
        path: 'requestHistory',
        loadChildren: './views/school/schoolRequestHistory.module#SchoolRequestHistoryModule'
      },
      {
        path: 'confirmRequest',
        loadChildren: './views/organization/organization.module#OrganizationModule'
      },
      {
        path: 'base',
        loadChildren: './views/base/base.module#BaseModule'
      },
      {
        path: 'buttons',
        loadChildren: './views/buttons/buttons.module#ButtonsModule'
      },
      {
        path: 'charts',
        loadChildren: './views/chartjs/chartjs.module#ChartJSModule'
      },
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'icons',
        loadChildren: './views/icons/icons.module#IconsModule'
      },
      {
        path: 'notifications',
        loadChildren: './views/notifications/notifications.module#NotificationsModule'
      },
      {
        path: 'theme',
        loadChildren: './views/theme/theme.module#ThemeModule'
      },
      {
        path: 'widgets',
        loadChildren: './views/widgets/widgets.module#WidgetsModule'
      }
    ]
  },
  { path: '**', component: P404Component }
  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
