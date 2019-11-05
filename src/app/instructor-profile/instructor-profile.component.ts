import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InstructorService } from '../services/instructor.service';

@Component({
  selector: 'app-instructor-profile',
  templateUrl: './instructor-profile.component.html',
  styleUrls: ['./instructor-profile.component.css']
})
export class InstructorProfileComponent implements OnInit {
  private id: number;
  instructor: any;
  courses: any[];

  constructor(private route: ActivatedRoute,
              private service: InstructorService,
              private router: Router) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe(params => {
        this.id = +params.get('id');
        console.log('Passed id :', this.id)
        this.service.getOne(this.id)
        .subscribe(response => {
          this.instructor = response;
          this.courses = this.instructor.courses;
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
