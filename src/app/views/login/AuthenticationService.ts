import { Injectable,NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
  })
export class AuthenticationService {
     router: Router;
    constructor(_router: Router,private zone:NgZone) { 
        this.router = _router;
    }

    login(username: string, password: string) {
        if((username === 'schoolA')&&(password === 'schoolA')){
        localStorage.setItem('SchoolA', JSON.stringify(username));
        localStorage.setItem('Role', 'school');
        this.router.navigate(['/dashboard']);
        return true;
    }
    else if((username === 'admin')&&(password === 'admin')){
        localStorage.setItem('AdminUser', JSON.stringify(username));
        console.log("Incorrect username/password",localStorage.getItem('AdminUser'));
         this.router.navigate(['/dashboard']);
         return true;
    }
    else{
        
        this.router.navigate(['/login']);
        return false
    }
        
    }

    logout() {
        console.log("Logging out");
        // remove user from local storage to log user out
        localStorage.removeItem('Role');
        localStorage.removeItem('SchoolA');
        localStorage.removeItem('AdminUser');
    }
}