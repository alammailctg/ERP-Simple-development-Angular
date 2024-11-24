import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductionOrderRequest, ProductionOrderResponse } from '../model/production.model';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class ProductionOrderService {
  private baseUrl = `${environment.apiUrl}/api/ProductionOrder`;

  constructor(private http: HttpClient) {}

  createProductionOrder(orderRequest: ProductionOrderRequest): Observable<ProductionOrderResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.baseUrl}/CreateProductionOrder`;  // Corrected template string
    const jsonData = JSON.stringify(orderRequest);
    return this.http.post<ProductionOrderResponse>(url, jsonData, { headers });
  }
}
