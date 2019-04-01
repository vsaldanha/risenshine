import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

    options: RequestOptions;
    headers: Headers;
  
    constructor(private _http: Http){
      this.headers = new Headers();
      this.headers.append('Content-Type', 'application/json');
      this.headers.append('Accept', 'application/json, */*'); 
      this.options = new RequestOptions({ headers: this.headers });
    } 

    getUserInfo(userName: String, password: String): Observable<any>{
        console.log(userName);
        return this._http.get("http://localhost:8091/rns/fse/getUserInfo?param1="+userName+"&param2="+password)
        .pipe(map(this.extractData));
    }


    extractData(res: Response) {
        let body = res;//.json();
        return body;
      }
  
      handleErrorObservable (error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error || "Oops !! Something went wrong");
      } 

}