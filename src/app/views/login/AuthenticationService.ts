import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
  })
export class AuthenticationService {
     router: Router;
    constructor(_router: Router) { 
        this.router = _router;
    }

    login(username: string, password: string) {
        if((username === 'schoolA')&&(password === 'schoolA')){
        localStorage.setItem('SchoolA', JSON.stringify(username));
         this.router.navigate(['/dashboard']);
         return true;
    }
    else if((username === 'admin')&&(password === 'admin')){
        localStorage.setItem('AdminUser', JSON.stringify(username));
         this.router.navigate(['/dashboard']);
         return true;
    }
    else{
        alert("Incorrect username/password");
        this.router.navigate(['/dashboard/login']);
        return false
    }
        
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('AdminUser');
    }
}