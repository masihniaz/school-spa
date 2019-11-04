import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  students: any[];
  constructor(private service: StudentService) { }

  ngOnInit() {
    this.service.getAll()
      .subscribe(response => {
        this.students = (response as any[]);
      });
  }

}
