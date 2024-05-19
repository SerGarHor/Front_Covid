import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseUrl = 'http://localhost:3000/api/covid-data';

  constructor(private http: HttpClient) { }

  getDepartamentos(departamento?: string): Observable<any[]> {
    const url = departamento ? `${this.baseUrl}?departamento=${departamento}` : this.baseUrl;
    return this.http.get<any[]>(url);
  }

  getAllDepartamentos(): Observable<any[]> {
    const url = this.baseUrl;
    return this.http.get<any[]>(url);
  }

}
