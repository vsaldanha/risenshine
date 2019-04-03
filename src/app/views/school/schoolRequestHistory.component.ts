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

   private gridApi;
   private gridColumnApi;
 
   DefColumnDefs = [
    { headerName: 'Event Type', field: 'eventType', width: 200, cellStyle: { 'font-size': '15px' }, filter: true },
    { headerName: 'Event Date', field: 'eventDate', width: 200, cellStyle: { 'font-size': '15px' }, filter: true },
     { headerName: 'Grade', field: 'classGrade', width: 200, cellStyle: { 'font-size': '15px' }, filter: true },
     { headerName: 'Subject', field: 'subject', width: 200, cellStyle: { 'font-size': '15px' }, filter: true },
     { headerName: 'Duration', field: 'timePeriod', width:135, cellStyle: { 'font-size': '15px' }, filter: true },
     { headerName: 'Status', field: 'status', width:135, cellStyle: { 'font-size': '15px' }, filter: true}
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

  onBtnExport() {
    const params = {
      columnGroups: true,
      allColumns: true,
      fileName: 'Request_Report',
      columnSeparator: ','
    };
    this.gridApi.exportDataAsCsv(params);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  


}
