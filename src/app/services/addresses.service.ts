import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Office } from './office';

const offices: Array<Office> = [];
const addressservicepoint = 'http://localhost:8181/UserManagement/office';

@Injectable({
  providedIn: 'root'
})
export class AddressesService {
  obsTextMsg: Observable<string>;

  constructor(private http: HttpClient) {
    console.log('inside ...');
  }
  get() {
    return offices.slice();
  }

  createOffice(office: Office) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    console.log('creating ' + office.name + ' ' + office.address);
    return this.http.post(addressservicepoint, office, httpOptions);
  }

  getOffice(id: number) {
    return this.http.get(addressservicepoint + '/' + id);
  }

  updateOffice(office: Office) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.put(addressservicepoint, office, httpOptions);
  }

  remove(id: number) {
    return this.http.delete(addressservicepoint + '/' + id);
  }

  load() {
    return this.http.get<Array<Office>>(addressservicepoint);
  }

    private handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  // return an observable with a user-facing error message
  return throwError(
    'Something bad happened; please try again later.');
  }
}



