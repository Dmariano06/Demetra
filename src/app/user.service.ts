import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/api/users';
  list:  any=[];
  islogin = false;
  admin = false;
  suser = false;
  client = false;
  four = false;
  host :string = 'http://localhost:8080';
  choixmenu : string  = 'A';
  name : string = "Foulen";
  public formData!: FormGroup; 
  constructor(private http: HttpClient) { }
  login(username :string,pwd : string ) {
    return this.http.get(`${this.baseUrl}/auth/${username}`);
   
   } 
   
   verifEmail(email :string) {
    return this.http.get(`${this.baseUrl}/verif/${email}`);
   
   }  
 
  getData(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
 
  createData(info: Object): Observable<Object> {
  
    return this.http.post(`${this.baseUrl}`, info);
  }
  
  updatedata(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }
 
  
  deleteData(id: number): Observable<any> {
   
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getAll(): Observable<any> {
   
    return this.http.get(`${this.baseUrl}`);
  }
}
