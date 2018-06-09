import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { User } from '../../../shared/models/user.model';
import { LoginService } from '../../../shared/services/login.service';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  submitted = false;
  credentials: LoginUser = {
    username: '',
    password: ''
  };

  constructor(private loginService: LoginService,
              private userService: UserService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: LoginUser) {
    this.submitted = true;

    this.loginService.login(form.username, form.password)
      .subscribe((res) => {
        const user: User = (<User>res.body);
        console.log(res);
        console.log(user);
        this.authService.authenticate(user);
        this.router.navigateByUrl('/')
          .then(() => {
          console.log('Login successful!');
        }).catch((err) => {
          console.log('Login unsuccessful', err);
        })
      });
  }

}

interface LoginUser {
  username: string,
  password: string
}
