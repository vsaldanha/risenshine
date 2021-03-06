import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService} from './alert.service';
import { AuthenticationService } from './AuthenticationService';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit{ 
  loginForm: FormGroup;
  loading: boolean;
  submitted = false;
  returnUrl: string;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private alertService: AlertService) {
      
        }

  ngOnInit() {
    this.loading = false;
    localStorage.removeItem('Role');
    localStorage.removeItem('userName');
    this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });

    // reset login status
      this.authenticationService.logout();

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['/login'];
   
     
  }

  

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }

      this.loading = this.authenticationService.login(this.f.username.value, this.f.password.value);
      
      //   if(this.loading===false){
      //    console.log("unwanted console***")
      //    this.loginForm.reset();
      // }
  }
}
