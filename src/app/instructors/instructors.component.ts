import { Component, OnInit } from '@angular/core';
import { InstructorService } from '../services/instructor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instructors',
  templateUrl: './instructors.component.html',
  styleUrls: ['./instructors.component.css']
})
export class InstructorsComponent implements OnInit {
  instructors: any[];
  constructor(private service: InstructorService,
              private router: Router) { }

  ngOnInit() {
    this.service.getAll()
      .subscribe(response => {
        this.instructors = (response as any[]);
      });
  }

  // navigate to instructor profile view
  onView(id) {
    this.router.navigate(['/instructors/', id]);
  }

  onDelete(id) {

  }

}
