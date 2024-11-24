import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment';


@Injectable({
  providedIn: 'root'
})
export class JwtAuthService {
  constructor(private http:HttpClient) { }

  private apiUrl = `${environment.apiUrl}/authentication`; // Base API URL
  private tokenKey:string='Bearer ';

  isAuthenticated():boolean
  {
   const token= localStorage.getItem(this.tokenKey)
   return token!==null;
  }

  UserLogin(username:string, password:string):Observable<any>
  {
    const jsonData={
      Username:username,
      Password:password
    };
    return this.http.post(`${environment.apiUrl}/Authentication/LoginUser`,jsonData,{responseType:'text'})
  }

 
  
  getRoleFromClaim(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get(`${environment.apiUrl}/Authentication/GetRoleFromClaim?token=${token}`, { headers, responseType: 'text' });
  }
  
  logOut(): Observable<any> {
    const token = localStorage.getItem('Bearer ');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json;charset=utf-8',
    });

    return this.http.post<any>(`${environment.apiUrl}/Authentication/logout`, {}, { headers });
  }
 
  getUserName(token: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetUserName`, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'text' // Set responseType to 'text' to handle string responses
    });
  }

  isValidToken(token:string|null): boolean {
    // Implement your token validation logic here
    return !!token; // simple example, change based on actual logic
  }


}
