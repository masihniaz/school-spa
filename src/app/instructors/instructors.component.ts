import { Component, OnInit } from '@angular/core';
import { InstructorService } from '../services/instructor.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-instructors',
  templateUrl: './instructors.component.html',
  styleUrls: ['./instructors.component.css']
})
export class InstructorsComponent implements OnInit {
  instructors: any[];
  instructorId: number;
  showAssignModal = false;
  showModal = false;
  showDeleted = false;
  showCreated = false;
  showAdded = false;
  allCourses: any[];
  form = new FormGroup({
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

  assignForm = new FormGroup({
    selectedCourse: new FormControl('', [
      Validators.required
    ])
  });

  constructor(private service: InstructorService,
              private router: Router) { }

  ngOnInit() {
    this.service.getAll()
      .subscribe(response => {
        this.instructors = (response as any[]);

        this.service.getAll('course')
        .subscribe(response2 => {
          this.allCourses = (response2 as any[]);
        });

      });
  }

  // navigate to instructor profile view
  onView(id) {
    this.router.navigate(['/instructors/', id]);
  }

  onDelete(id, index) {
    this.service.delete(id)
      .subscribe(response => {
        this.instructors.splice(index, 1);
        this.showDeleted = true;
      });
  }

  // assign lecturer to course
  onAssign() {
    const resource = {
      instructorId: this.instructorId,
      courseId: this.assignForm.value.selectedCourse
    };
    this.service.assign(resource)
      .subscribe(
        (response) => {
          this.showAssignModal = false;
          this.showAdded = true;
        }
      );
  }

  // create new instructor by calling the API
  onCreate() {
    if (this.form.valid) {
      this.service.create(this.form.value)
        .subscribe(response => {
          this.instructors.push(response);
          this.showModal = false;
          this.form.reset();
          this.showCreated = true;
        });
    }
  }

  // getter functions to access properties easily on the view
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

  get selectedCourse() {
    return this.assignForm.get('selectedCourse');
  }

}
