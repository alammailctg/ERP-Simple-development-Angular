import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { SalesOrderRequest } from '../model/SalesOrderRequest';
import { environment } from '../../environment';


@Injectable({
  providedIn: 'root'
})
export class CreatesalesorderService {
  constructor(private http:HttpClient) { }

  // private apiUrl='${environment.apiUrl}/api/sales-order';

 public createSalesOrder(salesOrder:SalesOrderRequest):Observable<void>{
    const headers=new  HttpHeaders({'Content-Type': 'application/json'});
    const jsonData=JSON.stringify(salesOrder);
    return this.http.post<void>(`${environment.apiUrl}/CreateSalesOrder/Create`,jsonData,{headers, withCredentials:true});
  }
}
