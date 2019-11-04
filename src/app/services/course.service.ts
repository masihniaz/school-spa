import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService extends DataService {

  constructor(http: HttpClient) {
    super('http://localhost:4000/api/course', http);
  }
}
