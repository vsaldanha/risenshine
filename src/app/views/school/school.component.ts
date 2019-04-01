import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { SchoolService } from './school.service';
import { IRequestDetails } from '../model/IRequestDetails';
import { ISubRequestDetails } from '../model/ISubRequestDetails';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.scss']
})
export class SchoolComponent implements OnInit {

  eventType: string;
	eventDate: string;
	classGrade: string;
	subject: string;
  timePeriod: string;
  schoolName: string;
  requestResponse: Response;
  private gridApi;
  private gridColumnApi;
 successMessage = false;
 failureMessage = false;
 rowSelected = false;
  private rowSelection= "single";
  private totalUsers : number=0;
  iRequestDetails:IRequestDetails=new IRequestDetails;
  subRequestDetails:ISubRequestDetails[]=[];

  //SubRequest table
  editField: string;
    personList: Array<any> = [
    ];

    awaitingPersonList: Array<any> = [
      { id: '', name: '', age: '', companyName: '', country: '', city: '' }
      
    ];

    updateList(id: number, property: string, event: any) {
      const editField = event.target.textContent;
      this.personList[id][property] = editField;
    }

    remove(id: any) {
      this.awaitingPersonList.push(this.personList[id]);
      this.personList.splice(id, 1);
    }

    add() {
      if (this.awaitingPersonList.length > 0) {
        const person = this.awaitingPersonList[0];
        this.personList.push(person);
        this.awaitingPersonList.splice(0, 1);
      }
    }

    changeValue(id: number, property: string, event: any) {
      this.editField = event.target.textContent;
    }
  

  constructor(private schoolService:SchoolService) { 
    
  }

  DefColumnDefs = [
    { headerName: 'Subject', field: 'subject', cellStyle: {'font-size': '15px'}},
    { headerName: 'Time Duration', field: 'time', cellStyle: {'font-size': '15px'}},
    { headerName: 'Grade', field: 'grade', cellStyle: {'font-size': '15px'}}

];

rowData = [];
rowDataDef = [];

  ngOnInit() {
  }

  submitRequest(requestForm: NgForm){
    console.log("Form submitted", this.eventType);
    this.iRequestDetails.eventType=this.eventType;
    this.iRequestDetails.eventDate=this.eventDate;
    this.iRequestDetails.classGrade=this.classGrade;
    this.iRequestDetails.subject=this.subject;
    this.iRequestDetails.timePeriod=this.timePeriod;
    this.iRequestDetails.schoolName="Lourdes";

    this.schoolService.submitRequest(this.iRequestDetails).subscribe(data => {
      console.log(data);
  }, error => {
      console.log("Oops !! Something went wrong");
  });
  }

//   public onAddRow(classGrade,subject,timePeriod) {
    
// this.schoolService.addNewRequest(classGrade.value,subject.value,timePeriod.value,).subscribe(data => {

//             this.requestResponse = data;
//            if (this.requestResponse.status == 200) {

//                this.iSubRequestDetails = this.extractData(this.requestResponse);
//                console.log("this.iRequestDetails : ", this.iSubRequestDetails);
//                this.rowDataDef = this.iSubRequestDetails;
//                console.log("this.rowDataDef : ", this.rowDataDef);
//            }
//            }, error => {
//            console.log("Oops !! Something went wrong");
//        });


//  /*this.DefColumnDefs[1].editable=true;
// this.gridApi.setColumnDefs( this.DefColumnDefs);
//  this.gridColumnApi.columnController.columnDefs[1].editable = true;*/
//   /* var res = this.gridApi.updateRowData({ add: [newRow] });
//    printResult(res);*/



//  }

//   //on changing row selection
//   onSelectionChanged() {
//   	this.rowSelected=true;
//     var selectedRows = this.gridApi.getSelectedRows();
   
//   }

//   public onGridReady(params) {
//     this.gridApi = params.api;
// this.gridColumnApi = params.columnApi;
//    // console.log("this.gridApi ",this.gridApi);

// }


// printResult(res) {
// console.log("---------------------------------------");
// if (res.add) {
// res.add.forEach(function(rowNode) {
//   console.log("Added Row Node", rowNode);
// });
// }
// if (res.remove) {
// res.remove.forEach(function(rowNode) {
//   console.log("Removed Row Node", rowNode);
// });
// }
// if (res.update) {
// res.update.forEach(function(rowNode) {
//   console.log("Updated Row Node", rowNode);
// });
// }
// }

public extractData(res: Response) {
  let body = res.json();
  return body;
}


}
