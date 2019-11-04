import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotFoundError } from '../common/not-found-error';
import { BadInput } from '../common/bad-input';
import { AppError } from '../common/app-error';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  constructor(private url: string, private http: HttpClient) { }

  getAll() {

  }

  create(resource) {

  }

  patch(resource) {

  }

  delete(id) {

  }

  private handleError(error: Response) {

  }
}
