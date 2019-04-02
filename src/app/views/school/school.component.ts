import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
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
  private rowSelection = "single";
  private totalUsers: number = 0;
  limit: any;
  rowCounter: number = 0;
  iRequestDetails: IRequestDetails = new IRequestDetails;
  requestFormArray :FormArray;
  requestForm: FormGroup;

  //SubRequest table
  remove(index: any) {
    this.requestFormArray.removeAt(index);
  }

  add() {
    this.requestFormArray = this.requestForm.get('requestFormArray') as FormArray;
    this.requestFormArray.push(this.addNewFormGroup());

    // if (this.rowCounter < 4) {
    //   const req = new ISubRequestDetails("", "", "");
    //   this.requestList.push(req);
    //   this.rowCounter++;
    // }
  }

  constructor(private formBuilder: FormBuilder, private schoolService: SchoolService) {}

  addNewFormGroup(): FormGroup {
    return this.formBuilder.group({
      classGrade: new FormControl('',Validators.required),
      subject: new FormControl('',Validators.required),
      timePeriod: new FormControl('',Validators.required)
    });
  }

  DefColumnDefs = [
    { headerName: 'Subject', field: 'subject', cellStyle: { 'font-size': '15px' } },
    { headerName: 'Time Duration', field: 'time', cellStyle: { 'font-size': '15px' } },
    { headerName: 'Grade', field: 'grade', cellStyle: { 'font-size': '15px' } }

  ];

  rowData = [];
  rowDataDef = [];

  ngOnInit() {
    this.requestForm = this.formBuilder.group({
      requestType: new FormControl('',Validators.required),
      requestDate: new FormControl('',Validators.required),
      requestFormArray: this.formBuilder.array([this.addNewFormGroup()])
    });
  }

  submitRequest(requestForm: FormGroup) {
    console.log(this.requestForm.value);
    this.iRequestDetails.eventType = this.requestForm.get('requestType').value;
    this.iRequestDetails.eventDate = this.requestForm.get('requestDate').value;
    this.iRequestDetails.schoolName = "Lourdes";
    this.iRequestDetails.subRequestDetails = [];
    let arrayLength=(<FormArray>this.requestForm.controls['requestFormArray']).length;
    
    for(let i=0;i<arrayLength;i++){
      let iSubRequestDetails: ISubRequestDetails=new ISubRequestDetails();
      iSubRequestDetails.classGrade = (<FormArray>this.requestForm.controls['requestFormArray']).at(i).get('classGrade').value;
      iSubRequestDetails.subject = (<FormArray>this.requestForm.controls['requestFormArray']).at(i).get('subject').value;
      iSubRequestDetails.timePeriod = (<FormArray>this.requestForm.controls['requestFormArray']).at(i).get('timePeriod').value;
      
      this.iRequestDetails.subRequestDetails.push(iSubRequestDetails);
    }
    
    

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
