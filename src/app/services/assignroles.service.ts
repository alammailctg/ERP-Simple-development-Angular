import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment';

// Define the interface outside the class
interface AssignRoleRequest {
  UserId: number;
  RoleIds: any[];
}

@Injectable({
  providedIn: 'root'
})
export class AssignrolesService {
  private apiAuthUrl = `${environment.apiUrl}/authentication`;

  constructor(private http: HttpClient) {}
 
  getAllUsers(token: string | null): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${this.apiAuthUrl}/GetAllUsers`, { headers });
  }

  getUserRoleByUserId(userId: number | null): Observable<any> {
    const token = localStorage.getItem('Bearer');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${this.apiAuthUrl}/GetUserRole?Id=${userId}`, { headers });
  }

  assignRole(jsonData: AssignRoleRequest): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.apiAuthUrl}/AssignRole`;
    console.log("Calling URL:", url); // Log the URL for debugging

    return this.http.post(url, jsonData, { headers, responseType: 'text' })
  }
}
