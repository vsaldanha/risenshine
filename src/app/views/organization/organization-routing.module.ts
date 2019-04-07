import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ModalComponent} from './modal.component';
import { ConfirmRequestComponent } from './confirmRequest.component';

const routes: Routes = [
  {
    path: '',
    component: ConfirmRequestComponent,
    data: {
      title: 'ConfirmRequest'
    }
  },
  {
    path: 'confirmSubRequest',
    component: ModalComponent,
    data: {
      title: 'confirmSubRequest'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule {}
