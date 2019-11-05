import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-course-profile',
  templateUrl: './course-profile.component.html',
  styleUrls: ['./course-profile.component.css']
})
export class CourseProfileComponent implements OnInit {
  private courseId: number;
  course: any;
  students: any;
  form = new FormGroup({
    id: new FormControl('', [

    ]),
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
    ]),
    totalStudents: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$')
    ])
  });

  constructor(private route: ActivatedRoute,
              private service: CourseService,
              private router: Router) { }

  ngOnInit() {
    this.route.paramMap
    .subscribe(params => {
      this.courseId = +params.get('id');

      // get course detail from API
      this.service.getOne(this.courseId, 'students')
        .subscribe(response => {
          this.course = response;
          this.students = this.course.students;
          // set the form values after data is fetched from API
          this.updateFormValues();
        });

    });
  }

  private updateFormValues() {
    this.form.setValue({
      id: this.course.id,
      name: this.course.name,
      instructorId: this.course.instructorId,
      description: this.course.description,
      totalStudents: this.course.students.length
    });
  }

  onView(id) {
    this.router.navigate(['/students/', id]);
  }

  onDelete(id) {

  }

  // getter functions to access properties easily on the view
  get id() {
    return this.form.get('id');
  }

  get instructorId() {
    return this.form.get('instructorId');
  }

  get name() {
    return this.form.get('name');
  }

  get description() {
    return this.form.get('description');
  }

  get totalStudents() {
    return this.form.get('totalStudents');
  }

}
