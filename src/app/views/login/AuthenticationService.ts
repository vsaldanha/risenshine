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
     loginResponse: Response;
     role: any;
     resp: boolean;
    constructor(_router: Router,private zone:NgZone, private _loginService: LoginService) { 
        this.router = _router;
    }

    

    login(username: string, password: string) : boolean {
        this.resp = false;
        this._loginService.getUserInfo(username,password).subscribe( data => {
            this.loginResponse = data;
            console.log("ROLE SHOULD BE: ", this.loginResponse);
            if (this.loginResponse.status == 200) {
                this.resp = true;
                this.role = this.extractData(this.loginResponse);
                localStorage.setItem('userName', JSON.stringify(username));
                localStorage.setItem('role', this.role);
                this.router.navigate(['/dashboard']); 
                console.log("********",this.resp);      
                return this.resp;
                }

        }, error => {
            alert("Invalid log in name and password");
            console.log("Oops !! Something went wrong");
            this.router.navigate(['/login']);
            return this.resp;
        });
       
        return this.resp;
    }

    logout() {
        console.log("Logging out");
        // remove user from local storage to log user out
        localStorage.removeItem('role');
        localStorage.removeItem('userName');
    }

    public extractData(res: Response) {
        let body = res.text();
        return body;
    }
}