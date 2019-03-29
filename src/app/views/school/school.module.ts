import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import {SchoolRoutingModule} from './school-routing.module';
import { SchoolComponent } from './school.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SchoolRoutingModule

  ],
  declarations: [ SchoolComponent ]
})
export class SchoolModule { }
