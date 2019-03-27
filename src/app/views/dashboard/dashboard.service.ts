import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  options: RequestOptions;
  headers: Headers;

  constructor(private _http: HttpClient){
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json, */*'); 
    this.options = new RequestOptions({ headers: this.headers });
  } 
  
    getTrendingOrganisations(): Observable<any>{
        return this._http.get("http://localhost:8091/rns/fse/getTrendingOrg").pipe(map(this.extractData));
    }

    getTrendingAssociates(): Observable<any>{
      return this._http.get("http://localhost:8091/rns/fse/getTrendingVolunteer").pipe(map(this.extractData));
    }

    getOpenRequests(): Observable<any>{
      return this._http.get("http://localhost:8091/rns/fse/getOpenRequests").pipe(map(this.extractData));
    }

    extractData(res: Response) {
      let body = res;//.json();
      return body;
    }

    private handleError<T> (operation = 'operation', result?: T) {
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
