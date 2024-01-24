import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private apiService: ApiService) {}

  login(): void {
    this.apiService.login(this.username, this.password).subscribe(response => {
      if (response.success) {
        console.log('Login successful');
      } else {
        console.error('Login failed:', response.message);
      }
    });
  }
}
