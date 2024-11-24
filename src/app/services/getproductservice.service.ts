import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { environment } from '../../environment';
 
export interface Product {
  id: number; // Assuming you have an id field
  name: string; // Add other fields as necessary
  price: number;
  // Add additional properties as needed
}

@Injectable({
  providedIn: 'root'
})


export class GetproductserviceService extends BaseService<Product,Product> {
  protected override  baseUrl: string = `${environment.apiUrl}/Inventory/AllProducts`; // Use protected here

  constructor(http: HttpClient) {
    super(http); // Call the base constructor without baseUrl here
  }

  getAllProducts(): Observable<Product[]> {
    return this.getAll(); // Using the base service method
  }
}

 