import { Component, OnInit } from '@angular/core';
import { SchoolService } from './school.service';
import { ISubRequestHistoryDetails } from '../model/ISubRequestHistoryDetails';

@Component({
  selector: 'app-requestHistory',
  templateUrl: './schoolRequestHistory.component.html'
})
export class SchoolRequestHistoryComponent implements OnInit {

   // Grid variables
   rowDataDef = [];

   paginationPageSize = 5;
 
   DefColumnDefs = [
    { headerName: 'Event Type', field: 'eventType', width: 200, cellStyle: { 'font-size': '15px' } },
    { headerName: 'Event Date', field: 'eventDate', width: 200, cellStyle: { 'font-size': '15px' } },
     { headerName: 'Grade', field: 'classGrade', width: 200, cellStyle: { 'font-size': '15px' } },
     { headerName: 'Subject', field: 'subject', width: 200, cellStyle: { 'font-size': '15px' } },
     { headerName: 'Duration', field: 'timePeriod', width:135, cellStyle: { 'font-size': '15px' } }
   ];

  constructor(private schoolService: SchoolService){}
  
  ngOnInit(){
    this.schoolService.getAllRequests().subscribe((response: any[]) => {
      console.log(response);
      this.rowDataDef = response;
    }, error => {
      console.log("Oops !! Something went wrong");
    });
  }

  


}
