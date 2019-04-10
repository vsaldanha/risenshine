import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable, of } from 'rxjs';
import { ISaveRequest } from '../model/ISaveRequest';

import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfirmRequestService {

  options: RequestOptions;
  headers: Headers;

  base_url='http://localhost:8091/rns/fse/';

  constructor(private _http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json, */*');
    this.options = new RequestOptions({ headers: this.headers });
  }

  getOpenRequests() {
    return this._http.get(this.base_url+"FetchAllOpenSubRequests")
      .pipe(map(this.extractData));
  }

  confirmOpenRequest(eventModelData): Observable<any> {
    let params = JSON.stringify(eventModelData);
    return this._http.post(this.base_url+"confirmOpenRequest", params, this.options)
      .pipe(map(this.extractData));
  }

  extractData(res: Response) {
    let body = res;//.json();
    return body;
  }

  handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error || "Oops !! Something went wrong");
  }

  saveRequest(iSaveRequest:ISaveRequest): Observable<any> {
    let params = JSON.stringify(iSaveRequest);
    return this._http.post(this.base_url+"saveRequests", params, this.options)
    .pipe(map(this.extractData));
  }

}