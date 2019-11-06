import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotFoundError } from '../common/not-found-error';
import { BadInput } from '../common/bad-input';
import { AppError } from '../common/app-error';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UnauthorizedError } from '../common/unauthorized-error';
import { ConflictError } from '../common/conflict-error';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  public static getAuthorizationHeader() {
    // tslint:disable-next-line: max-line-length
    const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ik1hc2loIiwiZW1haWwiOiJtYXNpaG5pYXpAeWFob28uY29tIiwicm9sZSI6MSwiaWF0IjoxNTcyNTQ1NzQ4fQ.scJAjb1K9UfQSZ-XMmDkNo3bgD2MdNYBARgyPxFrjho`;
    return new HttpHeaders().set('Authorization', 'Bearer ' + token);
  }

  public static handleError(error: Response) {
    const { status } = error;
    if (status === 400) {
      return throwError(new BadInput());
    } else if (status === 401) {
      return throwError(new UnauthorizedError());
    } else if (status === 404) {
      return throwError(new NotFoundError());
    } else if (status === 409) {
      return throwError(new ConflictError());
    }
    return throwError(new AppError(error));
  }

  constructor(private url: string, private http: HttpClient) { }

  getAll(option?: string) {
    let endpoint = '';
    if (option === 'course' && this.url.includes('student')) {
      endpoint = this.url.replace('student', 'course');
    } else if (option === 'course' && this.url.includes('instructor')) {
      endpoint = this.url.replace('instructor', 'course');
    } else {
      endpoint = this.url;
    }
    const headers = DataService.getAuthorizationHeader();
    return this.http.get(endpoint + 's', { headers })
      .pipe(catchError(DataService.handleError));
  }

  getOne(id, option?: string) {
    let additional = '/';
    if (option === 'students') {
      additional += option;
    } else if (option === 'courses') {
      additional += option;
    } else {
      additional = '';
    }
    const endpoint = `${this.url}/${id}${additional}`;
    console.log('ENDPOINT:: ',endpoint);
    const headers = DataService.getAuthorizationHeader();
    return this.http.get(endpoint, { headers })
      .pipe(catchError(DataService.handleError));
  }

  create(resource) {
    const headers = DataService.getAuthorizationHeader();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url, resource, { headers })
      .pipe(catchError(DataService.handleError));
  }

  patch(resource) {
    const id = resource.id;
    delete resource.id;
    const endpoint = `${this.url}/${id}`;
    const headers = DataService.getAuthorizationHeader();
    headers.append('Content-Type', 'application/json');
    return this.http.patch(endpoint, resource, { headers })
      .pipe(catchError(DataService.handleError));
  }

  delete(id) {
    const headers = DataService.getAuthorizationHeader();
    return this.http.delete(this.url + '/' + id, { headers })
      .pipe(catchError(DataService.handleError));
  }

  unassign(resource) {
    let endpoint = '';
    if (this.url.indexOf('student')) {
      endpoint = this.url.replace('student', 'course');
    } else {
      endpoint = this.url;
    }
    const headers = DataService.getAuthorizationHeader();
    headers.append('Content-Type', 'application/json');
    return this.http.post(endpoint + '/unassign', resource, { headers })
      .pipe(catchError(DataService.handleError));
  }

  assign(resource) {
    let endpoint = '';
    if ( this.url.indexOf('student')) {
      endpoint = this.url.replace('student', 'course');
    } else {
      endpoint = this.url;
    }
    const headers = DataService.getAuthorizationHeader();
    headers.append('Content-Type', 'application/json');
    return this.http.post(endpoint + '/assign', resource, { headers })
      .pipe(catchError(DataService.handleError));
  }

}
