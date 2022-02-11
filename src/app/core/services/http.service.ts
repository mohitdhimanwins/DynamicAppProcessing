import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Utils } from '../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  url: string = environment.apiURL;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    })
  }
  constructor(private httpClient: HttpClient, @Inject(String) private endpoint: string) { }

  get(): Observable<any> {
    return this.httpClient.get<any>(`${this.url}/${this.endpoint}`, this.httpOptions)
      .pipe(catchError(Utils.handleError))
  }


  getById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.url}/${this.endpoint}/${id}`, this.httpOptions)
      .pipe(catchError(Utils.handleError))
  }

  create(item: any): Observable<any> {
    return this.httpClient.post<any>(`${this.url}/${this.endpoint}`, JSON.stringify(item), this.httpOptions)
      .pipe(catchError(Utils.handleError))
  }

  post(item: any, options = {}): Observable<any> {
    return this.httpClient
      .post<any>(`${this.url}/${this.endpoint}`, item, {
        ...this.httpOptions,
        ...options
      })
      .pipe(catchError(Utils.handleError))
  }

  update(item:any): Observable<any> {
    return this.httpClient.put<any>(`${this.url}/${this.endpoint}`, item, this.httpOptions)
      .pipe(catchError(Utils.handleError))
  }
  updateQuery(item:any): Observable<any> {
    return this.httpClient.put<any>(`${this.url}/${this.endpoint}/` + '?' + Utils.objectToQueryString(item), this.httpOptions)
      .pipe(catchError(Utils.handleError))
  }

  delete(id: any): Observable<any> {
    return this.httpClient.delete<any>(`${this.url}/${this.endpoint}/${id}`, this.httpOptions)
      .pipe(catchError(Utils.handleError))
  }

  getByParams(item: any): Observable<any> {
    return this.httpClient
      .get<any>(`${this.url}/${this.endpoint}/` + '?' + Utils.objectToQueryString(item), this.httpOptions)
      .pipe(catchError(Utils.handleError))
  }

  request: any = null;
  getCascadingValuesByParams(item: any): Observable<any> {
    if (this.request) {
      this.request.unsubscribe();
    }
    this.request = this.httpClient
      .get<any>(`${this.url}/${this.endpoint}/` + '?' + Utils.objectToQueryString(item), this.httpOptions)
      .pipe(catchError(Utils.handleError))
    return this.request;
  }

  patch(item: any): Observable<any> {
    return this.httpClient.patch<any>(`${this.url}/${this.endpoint}`, item, this.httpOptions)
      .pipe(catchError(Utils.handleError))
  }

  put(item: any): Observable<any> {
    return this.httpClient.put<any>(`${this.url}/${this.endpoint}`, item, this.httpOptions)
      .pipe(catchError(Utils.handleError))
  }

}
