import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { SchoolService } from './school.service';
import { IRequestDetails } from '../model/IRequestDetails';

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

  iRequestDetails:IRequestDetails=new IRequestDetails;

  constructor(private schoolService:SchoolService) { }

  ngOnInit() {
  }

  submitRequest(requestForm: NgForm){
    console.log("Form submitted", this.eventType);
    this.iRequestDetails.eventType=this.eventType;
    this.iRequestDetails.eventDate=this.eventDate;
    this.iRequestDetails.classGrade=this.classGrade;
    this.iRequestDetails.subject=this.subject;
    this.iRequestDetails.timePeriod=this.timePeriod;
    this.iRequestDetails.schoolName="lourdes";

    this.schoolService.submitRequest(this.iRequestDetails).subscribe(data => {
      console.log(data);
  }, error => {
      console.log("Oops !! Something went wrong");
  });
  }

}
