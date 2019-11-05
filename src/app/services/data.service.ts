import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotFoundError } from '../common/not-found-error';
import { BadInput } from '../common/bad-input';
import { AppError } from '../common/app-error';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  public static getAuthorizationHeader() {
    // tslint:disable-next-line: max-line-length
    const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ik1hc2loIiwiZW1haWwiOiJtYXNpaG5pYXpAeWFob28uY29tIiwicm9sZSI6MSwiaWF0IjoxNTcyNTQ1NzQ4fQ.scJAjb1K9UfQSZ-XMmDkNo3bgD2MdNYBARgyPxFrjho`;
    return new HttpHeaders().set('Authorization', 'Bearer ' + token);
  }

  constructor(private url: string, private http: HttpClient) { }

  getAll(option?: string) {
    let endpoint = '';
    if(option === 'course') {
      endpoint = this.url.replace('student', 'course');
    } else {
      endpoint = this.url;
    }
    const headers = DataService.getAuthorizationHeader();
    return this.http.get(endpoint + 's', { headers })
      .pipe(catchError(this.handleError));
  }

  getOne(id, option?: string) {
    let additional = '/';
    if(option === 'students') {
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
      .pipe(catchError(this.handleError));
  }

  create(resource) {
    const headers = DataService.getAuthorizationHeader();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url, resource, { headers })
      .pipe(catchError(this.handleError));
  }

  patch(resource) {
    const headers = DataService.getAuthorizationHeader();
    return this.http.patch(this.url + '/' + resource.id, JSON.stringify(resource), { headers })
      .pipe(catchError(this.handleError));
  }

  delete(id) {
    const headers = DataService.getAuthorizationHeader();
    return this.http.delete(this.url + '/' + id, { headers })
      .pipe(catchError(this.handleError));
  }

  unassign(resource) {
    let endpoint = '';
    if(this.url.indexOf('student')) {
      endpoint = this.url.replace('student', 'course');
    } else {
      endpoint = this.url;
    }
    const headers = DataService.getAuthorizationHeader();
    headers.append('Content-Type', 'application/json');
    return this.http.post(endpoint + '/unassign', resource, { headers })
      .pipe(catchError(this.handleError));
  }

  assign(resource) {
    let endpoint = '';
    if(this.url.indexOf('student')) {
      endpoint = this.url.replace('student', 'course');
    } else {
      endpoint = this.url;
    }
    const headers = DataService.getAuthorizationHeader();
    headers.append('Content-Type', 'application/json');
    return this.http.post(endpoint + '/assign', resource, { headers })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: Response) {
    const { status } = error;
    if (status === 400) {
      return throwError(new BadInput(error.json()));
    } else if (status === 404) {
      return throwError(new NotFoundError());
    }
    return throwError(new AppError(error));
  }
}
