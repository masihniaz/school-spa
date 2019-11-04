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
  constructor(private url: string, private http: HttpClient) { }

  getAll() {
    const headers = this.getAuthorizationHeader();
    return this.http.get(this.url + 's', { headers })
      .pipe(catchError(this.handleError));
  }

  create(resource) {
    const headers = this.getAuthorizationHeader();
    return this.http.post(this.url, JSON.stringify(resource), { headers })
      .pipe(catchError(this.handleError));
  }

  patch(resource) {
    const headers = this.getAuthorizationHeader();
    return this.http.patch(this.url + '/' + resource.id, JSON.stringify(resource), { headers })
      .pipe(catchError(this.handleError));
  }

  delete(id) {
    const headers = this.getAuthorizationHeader();
    return this.http.delete(this.url + '/' + id, { headers })
      .pipe(catchError(this.handleError));
  }

  private getAuthorizationHeader() {
    // tslint:disable-next-line: max-line-length
    const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ik1hc2loIiwiZW1haWwiOiJtYXNpaG5pYXpAeWFob28uY29tIiwicm9sZSI6MSwiaWF0IjoxNTcyNTQ1NzQ4fQ.scJAjb1K9UfQSZ-XMmDkNo3bgD2MdNYBARgyPxFrjho`;
    return new HttpHeaders().set('Authorization', 'Bearer ' + token);
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
