import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[];
  form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
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

  onDelete(id) {

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
