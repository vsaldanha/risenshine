import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable, of } from 'rxjs';

import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfirmRequestService {

    options: RequestOptions;
    headers: Headers;

   constructor(private _http: Http){
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json, */*'); 
    this.options = new RequestOptions({ headers: this.headers });
  }

        getOpenRequests()  {
        return this._http.get("http://localhost:8091/rns/fse/getOpenRequests")
        .pipe(map(this.extractData));
    }

       confirmOpenRequest(eventModelData) : Observable<any> {
        let params = JSON.stringify(eventModelData);
        return this._http.post("http://localhost:8091/rns/fse/confirmOpenRequest",params,this.options)
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