import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ConfirmRequestService } from './confirmRequest.service';
import { IRequestDetails } from '../model/IRequestDetails';
import { Http, Response } from '@angular/http';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ISaveRequest } from '../model/ISaveRequest';
import { Router } from '@angular/router';

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
    confirmRequestForm: FormGroup;
    sub_req_id: string;
    status: string;
    volunteer: string;
    orgName: string;
    iSaveRequest: ISaveRequest;

    modalReference: any;
    router: Router;

    constructor(private _router: Router, private formBuilder: FormBuilder, private confirmRequestService: ConfirmRequestService, private modalService: NgbModal) {
        this.router = _router;
    }

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

        this.confirmRequestForm = this.formBuilder.group({
            schoolName: new FormControl('', Validators.required),
            eventType: new FormControl('', Validators.required),
            classes: new FormControl('', Validators.required),
            eventDate: new FormControl('', Validators.required),
            status: new FormControl(null, Validators.required),
            volunteerName: new FormControl('', Validators.required),
            orgName: new FormControl('', Validators.required)
        });

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

    open(content, rowDataDef) {
        this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
        this.modalReference.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });

        console.log("Row data: ", rowDataDef.data);

        this.confirmRequestForm.controls['schoolName'].setValue(rowDataDef.data.schoolName);
        this.confirmRequestForm.controls['eventType'].setValue(rowDataDef.data.eventType);
        this.confirmRequestForm.controls['classes'].setValue(rowDataDef.data.subject);
        this.confirmRequestForm.controls['eventDate'].setValue(rowDataDef.data.eventDate);
        this.confirmRequestForm.controls['status'].setValue(rowDataDef.data.status);

        this.sub_req_id = rowDataDef.data.sub_req_id;

    }

    submitRequest(requestForm: FormGroup) {

        this.status = this.confirmRequestForm.get('status').value;
        this.volunteer = this.confirmRequestForm.get('volunteerName').value;
        this.orgName = this.confirmRequestForm.get('orgName').value;

        this.iSaveRequest = new ISaveRequest();
        this.iSaveRequest.subReqId = this.sub_req_id;
        this.iSaveRequest.status = this.status;
        this.iSaveRequest.volunteer = this.volunteer;
        this.iSaveRequest.orgName = this.orgName;

        this.confirmRequestService.saveRequest(this.iSaveRequest).subscribe(response => {
            console.log(response.status);
        }, error => {
            console.log("Oops !! Something went wrong");
        });

        this.modalReference.close();

        this.ngOnInit();

        
    }



}