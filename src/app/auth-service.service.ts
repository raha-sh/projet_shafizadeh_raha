// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private apiUrl = '../../api'; 

  constructor(private http: HttpClient) {
    this.checkAuthentication();
  }

  private checkAuthentication(): void {
    const isAuthenticated = this.getToken() !== null;
    this.isAuthenticatedSubject.next(isAuthenticated);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  login(username: string, password: string): Observable<boolean> {
    const loginData = { username, password };

    return this.http.post<any>(`${this.apiUrl}/login`, loginData).pipe(
      map(response => {
        if (response.success) {
          const authToken = response.token;
          localStorage.setItem('authToken', authToken);
          this.isAuthenticatedSubject.next(true);
          return true;
        } else {
          return false;
        }
      })
    );
  }

  private getToken(): string | null {
    return localStorage.getItem('authToken');
  }
}
