import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: any[];
  constructor(private service: CourseService,
              private router: Router) { }

  ngOnInit() {
    this.service.getAll()
    .subscribe(response => {
      this.courses = (response as any[]);
    });
  }

  // navigate to course view
  onView(id) {
    this.router.navigate(['/courses', id]);
  }

  // delete course
  onDelete(id) {

  }

}
