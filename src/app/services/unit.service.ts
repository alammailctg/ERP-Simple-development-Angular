import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment';

export interface Unit {
  id: number; // Assuming you have an id field
  name: string; // Add other fields as necessary
}

@Injectable({
  providedIn: 'root'
})
export class UnitService extends BaseService<Unit,Unit> {
  protected override  baseUrl: string = `${environment.apiUrl}/Inventory/AllUnits`; // Use protected here

  constructor(http: HttpClient) {
    super(http); // Call the base constructor without baseUrl here
  }

  getAllUnits(): Observable<Unit[]> {
    return this.getAll(); // Using the base service method
  }
}