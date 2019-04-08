import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ConfirmRequestService } from './confirmRequest.service';
import { IRequestDetails } from '../model/IRequestDetails';
import { ISubRequestDetails } from '../model/ISubRequestDetails';
import { Http, Response } from '@angular/http';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal.component';

@Component({
    selector: 'app-confirmRequest',
    templateUrl: './confirmRequest.component.html',
    styleUrls: ['./organization.component.scss']
})
export class ConfirmRequestComponent implements OnInit {

    openEventResponse: Response;
    setOpenEventResponse: Response;
    eventData: IRequestDetails[] = [];
    eventModelData: IRequestDetails = new IRequestDetails;
    private gridApi;
    successMessage = false;
    failureMessage = false;
    closeResult: string;
    states: Array<string> = ['Open', 'Accept'];

    constructor(private formBuilder: FormBuilder, private confirmRequestService: ConfirmRequestService, private modalService: NgbModal) { }

    ColumnDefs = [
        { headerName: 'School', field: 'schoolName' },
        { headerName: 'Event Type', field: 'eventType' },
        { headerName: 'Grade', field: 'classGrade' },
        { headerName: 'Subject', field: 'subject' },
        { headerName: 'Duration', field: 'timePeriod' },
        { headerName: 'Status', field: 'status', editable: true },
        { headerName: 'Event Date', field: 'eventDate' },
    ];

    rowData = [];
    rowDataDef = [];
    rowSelection = "single";

    ngOnInit() {

        this.confirmRequestService.getOpenRequests().subscribe(data => {
            this.openEventResponse = data;
            if (this.openEventResponse.status == 200) {
                this.eventData = this.extractData(this.openEventResponse);
                this.rowDataDef = this.eventData;
                console.log(this.rowDataDef)
            }
        }, error => {
            console.log("Oops !! Something went wrong");
        });
    }



    public extractData(res: Response) {
        let body = res.json();
        return body;
    }

    public onGridReady(params) {
        this.gridApi = params.columnApi;
        // console.log("this.gridApi ",this.gridApi);

    }

    onCellValueChanged(rowDataDef) {
        console.log("inside cell changed", rowDataDef);
        this.eventModelData = rowDataDef.data;
        console.log("*****", this.eventModelData);
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    open(content) {
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      }



}