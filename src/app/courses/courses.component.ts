import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: any[];
  form = new FormGroup({
    instructorId: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$')
    ]),
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(10)
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(30)
    ])
  });

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

  // getter functions to access properties easily on the view
  get instructorId() {
    return this.form.get('instructorId');
  }

  get name() {
    return this.form.get('name');
  }

  get description() {
    return this.form.get('description');
  }

}
