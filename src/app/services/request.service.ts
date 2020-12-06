import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  baseUrl:string=environment.apiUrl;
  constructor(
    private http:HttpClient
  ) { }

  getBookList(searchParams):Observable<any>{
    return this.http.get(this.baseUrl+'/books',{params:searchParams});
  }

  addBook(payload):Observable<any>{
    return this.http.post(this.baseUrl+'/books',payload);
  }

  getBookById(id):Observable<any>{
    return this.http.get(this.baseUrl+`/books/${id}`);
  }
 

}
