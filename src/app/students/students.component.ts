import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  students: any[];
  constructor(private service: StudentService, private router: Router) { }

  ngOnInit() {
    this.service.getAll()
      .subscribe(response => {
        this.students = (response as any[]);
      });
  }

  onView(id) {
    this.router.navigate(['/students/', id]);
  }

  onDelete(id) {

  }

}
