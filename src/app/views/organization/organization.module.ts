import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import {OrganizationRoutingModule} from './organization-routing.module';
import { ConfirmRequestComponent } from './confirmRequest.component';
import { AgGridModule} from "ag-grid-angular/main";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ModalComponent } from './modal.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    OrganizationRoutingModule,
    NgbModule,
    AgGridModule.withComponents(
      [ConfirmRequestComponent])
  ],
  declarations: [ ConfirmRequestComponent, ModalComponent ],
  exports: [ModalComponent],


})
export class OrganizationModule { }
