import { NgModule} from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule} from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import {LoginModule} from '../login/login.module';
import {RegisterModule} from '../register/register.module';
import { AlertModule } from 'ngx-bootstrap/alert';

import { DashboardComponent } from './dashboard.component';
import { AlertsComponent } from '../notifications/alerts.component';

import { AgGridModule} from "ag-grid-angular/main";

import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [
    FormsModule,
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    LoginModule,
    RegisterModule,
    CommonModule,
    AlertModule.forRoot(),
    AgGridModule.withComponents(
      [DashboardComponent]
  )
  ],
  declarations: [ DashboardComponent, AlertsComponent]
})
export class DashboardModule { }
