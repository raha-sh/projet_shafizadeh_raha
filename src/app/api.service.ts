import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = '../../api';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
  }

  signUp(username: string,email: string, password: string): Observable<any> {
    const body = `username=${username}email=${email}&password=${password}`;
    return this.http.post(`${this.apiUrl}`, body, { headers: this.getHeaders() });
  }

  login(username: string, password: string): Observable<any> {
    const body = `username=${username}&password=${password}`;
    return this.http.post(`${this.apiUrl}`, body, { headers: this.getHeaders() });
  }

  getProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}?getProducts`);
  }

  addToBasket(productId: number): Observable<any> {
    const body = `addToBasket=true&productId=${productId}`;
    return this.http.post(`${this.apiUrl}`, body, { headers: this.getHeaders() });
  }

  searchProducts(searchTerm: string): Observable<any> {
    const body = `searchTerm=${searchTerm}`;
    return this.http.post(`${this.apiUrl}?searchProducts`, body, { headers: this.getHeaders() });
  }
}

