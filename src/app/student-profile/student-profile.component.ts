import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../services/student.service';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {
  private studentId: number;
  student: any;
  courses: any;
  form = new FormGroup({
    id: new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ]),
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$')
    ]),
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(15)
    ]),
    birthday: new FormControl('', [
      Validators.required,
      (control: AbstractControl): ValidationErrors | null => {
        if (!moment(control.value).isValid()) {
          return { notValidDate: true };
        }
        return null;
      }
    ])
  });

  constructor(private route: ActivatedRoute,
              private service: StudentService,
              private router: Router) { }

  ngOnInit() {
    // get student id from URL params
    this.route.paramMap
    .subscribe(params => {
      this.studentId = +params.get('id');

      // get student from api
      this.service.getOne(this.studentId, 'courses')
        .subscribe(response => {
          this.student = response;
          this.courses = this.student.courses;
          // set the form values after data is fetched from API
          this.updateFormValues();
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

  onUpdate() {

  }

  private updateFormValues() {
      this.form.setValue({
        id: this.student.id,
        name: this.student.name,
        lastName: this.student.lastName,
        email: this.student.email,
        phoneNumber: this.student.phoneNumber,
        address: this.student.address,
        birthday: moment(this.student.birthday).format('YYYY-MM-DD')
      });
  }

  // getter functions to access properties easily on the view
  get id() {
    return this.form.get('id');
  }

  get name() {
    return this.form.get('name');
  }

  get lastName() {
    return this.form.get('lastName');
  }

  get email() {
    return this.form.get('email');
  }

  get phoneNumber() {
    return this.form.get('phoneNumber');
  }

  get address() {
    return this.form.get('address');
  }

  get birthday() {
    return this.form.get('birthday');
  }

}
