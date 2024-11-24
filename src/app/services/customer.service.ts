import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment';


export interface Customer {
  id: number; // Assuming you have an id field
  name: string; // Add other fields as necessary
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BaseService<Customer,Customer> {
  protected override  baseUrl: string = `${environment.apiUrl}/Customer/AllCustomer`; // Use protected here

  constructor(http: HttpClient) {
    super(http); // Call the base constructor without baseUrl here
  }

  getAllCustomers(): Observable<Customer[]> {
    return this.getAll(); // Using the base service method
  }
}
