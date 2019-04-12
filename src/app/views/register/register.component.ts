import { Component } from '@angular/core';
import { NgForm, FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { IRegisterDetails } from './../model/IRegisterDetails';
import { RegisterService } from './register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {

  registerForm: FormGroup;
  public ifVolunteer: boolean = false;
  types: Array<string> = ['School', 'Organization', 'Volunteer'];
  iRegisterDetails: IRegisterDetails;
  registerResponse: Response
  

  constructor(private router: Router, private formBuilder: FormBuilder, private registerService: RegisterService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      userType: new FormControl(null, Validators.required),
      orgName: new FormControl('', Validators.required),
      empId: new FormControl('', Validators.required)
    });
  }

  changeAction(e) {
    if(e === "Volunteer") {
      this.ifVolunteer = true;
    } else {
      this.ifVolunteer = false;
    }
  }

  submitRequest(registerForm: FormGroup) {

    this.iRegisterDetails = new IRegisterDetails();
    console.log(this.registerForm.value);
    this.iRegisterDetails.username = this.registerForm.get('username').value;
    this.iRegisterDetails.password = this.registerForm.get('password').value;
    this.iRegisterDetails.email = this.registerForm.get('email').value;
    this.iRegisterDetails.phone = this.registerForm.get('phone').value;
    this.iRegisterDetails.userType = this.registerForm.get('userType').value;
    this.iRegisterDetails.orgName = this.registerForm.get('orgName').value;
    this.iRegisterDetails.empId = this.registerForm.get('empId').value;

    this.registerService.submitRequest(this.iRegisterDetails).subscribe(response => {
      this.registerResponse = response;
      console.log(response.status);
      if(this.registerResponse.status == 200){
      this.router.navigate(['/login']);
      }
    }, error => {
      console.log("Oops !! Something went wrong");
    });
  }

}
