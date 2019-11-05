import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[];
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

}
