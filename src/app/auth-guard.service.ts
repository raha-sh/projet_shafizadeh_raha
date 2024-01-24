import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard extends Router {

  constructor(private authService: AuthService, private router: Router) {
    super();
  }

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/login']); 
      return false;
    }
  }
}
