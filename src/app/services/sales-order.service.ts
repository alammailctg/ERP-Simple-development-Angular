import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SalesOrderRequest, SalesOrderResponse } from '../model/SalesOrderRequest';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class SalesOrderService extends BaseService<SalesOrderRequest, SalesOrderResponse> {
  protected override baseUrl: string = `${environment.apiUrl}/SalesOrder/CreateSalesOrder`;
  specificUrl: string = `${environment.apiUrl}/SalesOrder/AddSalesOrders`;
  getSalesOrderUrl: string = `${environment.apiUrl}/SalesOrder/GetAllUnApprovedSalesOrders`;
  approveOrderUrl: string = `${environment.apiUrl}/SalesOrder/ApproveOrderItems`;
  siteUrl:string= `${environment.apiUrl}/SalesOrder`;


  constructor(http: HttpClient) {
    super(http);
  }

  createSalesOrder(orderRequest: SalesOrderRequest): Observable<SalesOrderResponse> {
    return this.create(orderRequest);
  }

  addSalesOrder(): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.specificUrl, {}, { headers, responseType: 'text' });
  }

  getSalesOrder(criteria:any):Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/SalesOrder/GetAllUnApprovedSalesOrders`,criteria);
  }

  approveOrderItems(postArr: any[]): Observable<any> {
    return this.http.post(this.approveOrderUrl, postArr);
  }

  
  deleteSalesOrderById(salesOrderId: number): Observable<string> { // Use a specific type if possible
    const url = `${this.siteUrl}/DeleteSalesOrderBySalesOrderId?salesOrderId=${salesOrderId}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<string>(url, {}, { headers, responseType: 'text' as 'json' });
  }
   
  
}
