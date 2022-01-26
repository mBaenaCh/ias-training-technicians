import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TechnicianModel } from '../../models/technician';
// here, put all methods that you need for provide technician
// like create, update, query or delete.
@Injectable({
  providedIn: 'root'
})
export class TechnicianService {

  baseUrl: string;

  // With HttpClient, you can use http methods like post, put, delete and get.
  constructor(private readonly http: HttpClient) { 
    this.baseUrl = 'http://localhost:3000/technicians';
  }

  create(technician: TechnicianModel): Observable<TechnicianModel> {
    const technicianBody = {
      "technicianId": technician.technicianId,
      "name": technician.name,
      "lastName": technician.lastName
    }
    return this.http.post<TechnicianModel>(this.baseUrl, technicianBody);
  }

  getAll(): Observable<TechnicianModel[]> {
    return this.http.get<TechnicianModel[]>(this.baseUrl);
  }

  getById(id: number): Observable<TechnicianModel>{
    return this.http.get<TechnicianModel>(`${this.baseUrl}/${id}`);
  }  

  updateById(id: number, technician: TechnicianModel): Observable<TechnicianModel>{
    /* The technicianId send in the body is ignored by the route because that property is inmutable */
    const technicianBody = {
      "technicianId": technician.technicianId,
      "name": technician.name,
      "lastName": technician.lastName
    }
    return this.http.put<TechnicianModel>(`${this.baseUrl}/${id}`, technicianBody);
    
  }

  deleteById(id: number): Observable<TechnicianModel>{
    return this.http.delete<TechnicianModel>(`${this.baseUrl}/${id}`);
  }
}
