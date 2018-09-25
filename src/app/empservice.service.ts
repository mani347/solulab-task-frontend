import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { Binary } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class EmpserviceService {
  url = 'http://localhost:3000/emp';

  constructor(private _http: Http) {}

  addEmployee(
    fName: string,
    lName: string,
    empCode: string,
    phone: string,
    email: string
  ): any {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const data: object = {
      firstName: fName,
      lastName: lName,
      employeeCode: empCode,
      phone: phone,
      email: email
    };
    return this._http
      .post(this.url + '/create', data, options)
      .pipe(map(res => res.json()));
  }

  getAllEmpployees(): any {
    return this._http.get(this.url).pipe(map(res => res.json()));
  }

  updateEmployee(
    fName: string,
    lName: string,
    empCode: string,
    phone: string,
    email: string
  ) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const data: object = {
      firstName: fName,
      lastName: lName,
      employeeCode: empCode,
      phone: phone,
      email: email
    };
    return this._http
      .patch(this.url + '/' + email, data, options)
      .pipe(map(res => res.json()));
  }

  deleteEmployee(email: string) {
    return this._http
      .delete(this.url + '/' + email)
      .pipe(map(res => res.json()));
  }
}
