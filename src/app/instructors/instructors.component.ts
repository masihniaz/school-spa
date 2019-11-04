import { Component, OnInit } from '@angular/core';
import { InstructorService } from '../services/instructor.service';

@Component({
  selector: 'app-instructors',
  templateUrl: './instructors.component.html',
  styleUrls: ['./instructors.component.css']
})
export class InstructorsComponent implements OnInit {
  instructors: any[];
  constructor(private service: InstructorService) { }

  ngOnInit() {
    this.service.getAll()
    .subscribe(response => {
      this.instructors = (response as any[]);
    });
  }

}
