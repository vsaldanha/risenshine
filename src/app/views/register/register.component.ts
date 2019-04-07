import { Component } from '@angular/core';
import { NgForm, FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {

  registerForm: FormGroup;
  public showAdditionalFields: boolean = false;
  public ifVolunteer: boolean = false;
  types: Array<string> = ['School', 'Organization', 'Volunteer'];

  constructor(private formBuilder: FormBuilder) { }

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

  showMoreFields(){
    this.showAdditionalFields=true;
  }

  changeAction(e) {
    if(e === "Volunteer") {
      this.ifVolunteer = true;
    } else {
      this.ifVolunteer = false;
    }
  }

}
