import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { APIDetails } from './config';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DataServiceService {

  constructor(private _http: HttpClient) { }


  getAllEmployees(): Observable<any> {
    let url = APIDetails.APIUrl + APIDetails.getAllEmployees;
    return this._http.get(url);
  }


  addEmployee(empData: any): Observable<any> {
    let data = empData;
    console.log(empData);
    const headers = { 'Authorization': '' };
    let url = APIDetails.APIUrl + APIDetails.addEmployeeData
    return this._http.post(url, empData);
  }

  removeEmployee(id: any): Observable<any> {
    let url = APIDetails.APIUrl + APIDetails.deleteEmployeeData + id;
    return this._http.delete(url);
  }
}
