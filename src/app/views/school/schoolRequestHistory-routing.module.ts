import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchoolRequestHistoryComponent } from './schoolRequestHistory.component';

const routes: Routes = [
  {
    path: '',
    component: SchoolRequestHistoryComponent,
    data: {
      title: 'RequestHistory'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolRequestHistoryRoutingModule {}
