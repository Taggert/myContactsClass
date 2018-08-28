import {Component, OnInit} from '@angular/core';
import {LoginInteractor} from '../business/login.interactor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
  providers: [LoginInteractor]
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';
  success: number;
  error = '';

  constructor(private loginInteractor: LoginInteractor) {
  }

  ngOnInit() {
    this.success = 0;
  }

  registration() {
    this.loginInteractor.registration(this.email, this.password).subscribe(value => {
        this.success = 0;
        if (value) {
          console.log('Registration success');
          this.success = 1;
        } else {
          console.log('Smth wrong');
          this.success = 2;
        }
      }, err => {
        this.error = err;
        console.log('Error: ' + err);
        this.success = 2;
      }, () => {
        this.email = '';
        this.password = '';
        this.error = '';
      }
    );
  }

  login() {
    this.loginInteractor.login(this.email, this.password).subscribe(value => {
        this.success = 0;
        if (value) {
          console.log('Login success');
          this.success = 1;
        } else {
          console.log('Smth wrong');
          this.success = 2;
        }
      }, err => {
        this.error = err;
        console.log('Error: ' + err);
        this.success = 2;
      }, () => {
        this.email = '';
        this.password = '';
        this.error = '';
      }
    );
  }

}
