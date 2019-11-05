import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InstructorService } from '../services/instructor.service';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import * as moment from 'moment';


@Component({
  selector: 'app-instructor-profile',
  templateUrl: './instructor-profile.component.html',
  styleUrls: ['./instructor-profile.component.css']
})
export class InstructorProfileComponent implements OnInit {
  private instructorId: number;
  instructor: any;
  courses: any[];
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
              private service: InstructorService,
              private router: Router) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe(params => {
        this.instructorId = +params.get('id');

        // get instructor from API
        this.service.getOne(this.instructorId, 'courses')
        .subscribe(response => {
          this.instructor = response;
          this.courses = this.instructor.courses;
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
        id: this.instructor.id,
        name: this.instructor.name,
        lastName: this.instructor.lastName,
        email: this.instructor.email,
        phoneNumber: this.instructor.phoneNumber,
        address: this.instructor.address,
        birthday: moment(this.instructor.birthday).format('YYYY-MM-DD')
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
