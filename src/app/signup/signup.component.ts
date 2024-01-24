import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private apiService: ApiService) {}

  signUp(): void {
    this.apiService.signUp(this.username, this.email, this.password).subscribe(response => {
      if (response.success) {
        console.log('Your account is ready!');
      } else {
        console.error('Failed to sign up. Please try again.', response.message);       
      }
    });
  }
}
