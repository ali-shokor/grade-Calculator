import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  imports: [FormsModule, CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  isSignUp = false;
  name = '';
  email = '';
  password = '';

  constructor(private userService: UserService) {}

  // handleSubmit() {
  //   // Here you would typically make an API call to authenticate the user
  //   // For this example, we'll just simulate a successful login
  //   this.userService.login({ name: this.name, email: this.email });
  // }

  toggleSignUp() {
    this.isSignUp = !this.isSignUp;
  }
}
