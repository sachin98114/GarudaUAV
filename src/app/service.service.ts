import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './interface';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  apiUrl = "http://localhost:3000/posts";

  constructor(private http: HttpClient){ }

  get() {
    return this.http.get(this.apiUrl);
  }

  setval(val: any) {
    return this.http.post(this.apiUrl, val);
  }

  delete(id:number){
    return this.http.delete(`http://localhost:3000/posts/${id}`)
  }

  patch(id:number,val:any){
    return this.http.put(`http://localhost:3000/posts/${id}`,val)
   }

   searchProduct(query: string) {
    return this.http.get<User[]>(
      `http://localhost:3000/posts?q=${query}`
    );
  }
}
