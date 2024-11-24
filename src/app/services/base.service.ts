import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService<RequestType, ResponseType> {
  protected abstract baseUrl: string;
  constructor(protected http: HttpClient) {}

  getAll(): Observable<ResponseType[]> {
    return this.http.get<ResponseType[]>(`${this.baseUrl}`);
  }

  getById(id: number): Observable<ResponseType> {
    return this.http.get<ResponseType>(`${this.baseUrl}/${id}`);
  }

  create(entity: RequestType): Observable<ResponseType> {
    return this.http.post<ResponseType>(this.baseUrl, entity);
  }
 
  update(id: number, entity: RequestType): Observable<ResponseType> {
    return this.http.put<ResponseType>(`${this.baseUrl}/${id}`, entity);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
