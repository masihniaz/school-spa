import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppError } from '../common/app-error';
import { BadInput } from '../common/bad-input';
import { catchError } from 'rxjs/operators';
import { DataService } from '../services/data.service';
import { NotFoundError } from '../common/not-found-error';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidLogin = false;
  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  constructor(private service: AuthService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
  }

  signIn() {
    if (this.form.valid) {
      this.service.login(this.form.value)
        .pipe(catchError(DataService.handleError))
        .subscribe(
          (response) => {
          if (response) {
            const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
            this.router.navigate([returnUrl || '/']);
          }
        },
        (error: AppError) => {
          if (error instanceof BadInput || error instanceof NotFoundError) {
            this.invalidLogin = true;
          }
        });
    }
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

}
