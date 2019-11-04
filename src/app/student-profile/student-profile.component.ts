import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {
  private id: number;
  student: any;
  courses: any;
  constructor(private route: ActivatedRoute,
              private service: StudentService,
              private router: Router) { }

  ngOnInit() {
    this.route.paramMap
    .subscribe(params => {
      this.id = +params.get('id');
      this.service.getOne(this.id)
        .subscribe(response => {
          this.student = response;
          this.courses = this.student.courses;
        });
    });
  }

  // navigate to course view
  onView(id) {
    this.router.navigate(['courses/', id]);
  }

  // delete student from course
  onDelete(id) {

  }

}
