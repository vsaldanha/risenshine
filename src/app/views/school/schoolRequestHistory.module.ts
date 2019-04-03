import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgGridModule} from "ag-grid-angular/main";
import { SchoolRequestHistoryComponent } from './schoolRequestHistory.component';
import {SchoolRequestHistoryRoutingModule} from './schoolRequestHistory-routing.module';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    AgGridModule,
    SchoolRequestHistoryRoutingModule
  ],
  declarations: [ SchoolRequestHistoryComponent ]
})
export class SchoolRequestHistoryModule { }
