import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  createTechnician(technician: TechnicianModel): Promise<TechnicianModel> {
    const technicianBody = {
      "technicianId": technician.technicianId,
      "name": technician.name,
      "lastName": technician.lastName
    }
    return this.http.post<TechnicianModel>(this.baseUrl, technicianBody ).toPromise();
  }

  getAll(): Promise<TechnicianModel[]> {
    return this.http.get<TechnicianModel[]>(this.baseUrl).toPromise();
  }

  getById(id: number): Promise<TechnicianModel>{
    return this.http.get<TechnicianModel>(`${this.baseUrl}/${id}`).toPromise();
  }  

  updateById(id: number, technician: TechnicianModel): Promise<TechnicianModel>{
    /* The technicianId send in the body is ignored by the route because that property is inmutable */
    const technicianBody = {
      "technicianId": technician.technicianId,
      "name": technician.name,
      "lastName": technician.lastName
    }
    return this.http.put<TechnicianModel>(`${this.baseUrl}/${id}`, technicianBody).toPromise();
    
  }

  deleteById(id: number): Promise<TechnicianModel>{
    return this.http.delete<TechnicianModel>(`${this.baseUrl}/${id}`).toPromise();
  }
}
