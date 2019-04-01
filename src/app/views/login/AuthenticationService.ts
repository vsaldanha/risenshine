import { Injectable,NgZone } from '@angular/core';
import {LoginService} from './login.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
  })
export class AuthenticationService {
     router: Router;
     loginResponse: Response
     role: any;
    constructor(_router: Router,private zone:NgZone, private _loginService: LoginService) { 
        this.router = _router;
    }

    

    login(username: string, password: string) : boolean {
        console.log("in here!!!");
        this._loginService.getUserInfo(username,password).subscribe( data => {
            this.loginResponse = data;
            console.log("ROLE SHOULD BE: ", this.loginResponse);
            if (this.loginResponse.status == 200) {
                this.role = this.extractData(this.loginResponse);
                console.log("Role from response is:", this.role);
            }
            console.log("Role outside method:", this.role);
            localStorage.setItem('userName', JSON.stringify(username));
            localStorage.setItem('role', this.role);
            if(this.role === "school"){
            this.router.navigate(['/dashboard']);
            return true;
        }
        else{
            
            this.router.navigate(['/login']);
            return false
        }
        }, error => {
            console.log("Oops !! Something went wrong");
        });
       
        return false;
    }

    logout() {
        console.log("Logging out");
        // remove user from local storage to log user out
        localStorage.removeItem('Role');
        localStorage.removeItem('SchoolA');
        localStorage.removeItem('AdminUser');
    }

    public extractData(res: Response) {
        let body = res.text();
        return body;
    }
}