import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  private userId: number;
  user: any;
  form = new FormGroup({
    id: new FormControl('', [
      Validators.required
    ]),
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    role: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$')
    ]),
  });

  constructor(private route: ActivatedRoute,
              private service: UserService) { }

  ngOnInit() {
    this.route.paramMap
    .subscribe(params => {
      this.userId = +params.get('id');

      // get course detail from API
      this.service.getOne(this.userId)
        .subscribe(response => {
          this.user = response;
          // set the form values after data is fetched from API
          this.updateFormValues();
        });

    });
  }

  private updateFormValues() {
    this.form.setValue({
      id: this.user.id,
      name: this.user.name,
      email: this.user.email,
      role: this.user.role
    });
  }

  // getter functions to access properties easily on the view
  get id() {
    return this.form.get('id');
  }

  get name() {
    return this.form.get('name');
  }

  get email() {
    return this.form.get('email');
  }

  get role() {
    return this.form.get('role');
  }

}
