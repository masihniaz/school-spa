import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[];
  showModal = false;
  showDeleted = false;
  showCreated = false;

  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);

  passwd = new FormControl('', [
    Validators.required,
    CustomValidators.equalTo(this.password)
  ]);

  form = new FormGroup({
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
    password: this.password,
    passwd: this.passwd
  });

  constructor(private service: UserService,
              private router: Router) { }

  ngOnInit() {
    this.service.getAll()
    .subscribe(response => {
      this.users = (response as any[]);
    });
  }

  onView(id) {
    this.router.navigate(['users', id]);
  }

  // delete the user
  onDelete(id, index) {
    this.service.delete(id)
      .subscribe(response => {
        this.users.splice(index, 1);
        this.showDeleted = true;
      });
  }

  // create new user by calling the API
  onCreate() {
    if (this.form.valid) {
      this.service.create(this.form.value)
        .subscribe(response => {
          this.users.push(response);
          this.showModal = false;
          this.form.reset();
          this.showCreated = true;
        });
    }
  }

  // getter functions to access properties easily on the view
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
