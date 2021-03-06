import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { LoginComponent } from '../login/login.component';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    LoginRoutingModule
  ],
  declarations: [ LoginComponent ]
})
export class LoginModule { }
