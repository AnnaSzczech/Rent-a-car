import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  onRegister(form: NgForm) {
    const email = form.value.email;
    const pass = form.value.password;
    this.userService.createUser(email, pass).subscribe(res => {
      console.log(res);
    });
  }

}
