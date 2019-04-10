import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { IRegisterDetails } from '../model/IRegisterDetails';
import { HttpClient } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  options: RequestOptions;
  headers: Headers;

  base_url: String = "http://localhost:8091/rns/fse/";

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json, */*');
    this.options = new RequestOptions({ headers: this.headers });
  }

  submitRequest(registerDetails:IRegisterDetails): Observable<any> {
    let params = JSON.stringify(registerDetails);
    return this.http.post(this.base_url + "registerUser",params, this.options).pipe(map(this.extractData));
  }


//   addNewRequest(classGrade,subject,timePeriod)  {
//     let params = JSON.stringify(classGrade);
//     return this._http.post(this.base_url + "addNewRequest",params,this.options).pipe(map(this.extractData));
// }

  extractData(res: Response) {
    let body = res.json();
    return body;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
