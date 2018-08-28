import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {AuthModel} from '../dto/auth.model';
import {Observable, of, throwError} from 'rxjs';
import {TokenModel} from '../dto/token.model';
import {catchError, map} from 'rxjs/operators';
import {el} from '@angular/platform-browser/testing/src/browser_util';
import {ContactsModel} from '../dto/contacts.model';
import {ContactModel} from '../dto/contact.model';

@Injectable()
export class HttpProvider {

  private BASE_URL = 'https://telranstudentsproject.appspot.com/_ah/api/contactsApi/v1';

  private headers: HttpHeaders = new HttpHeaders({
    'Authorization': 'this.authService.getToken()'
  });


  constructor(private http: HttpClient) {
  }

  registration(auth: AuthModel): Observable<TokenModel> {
    const body = {
      email: auth.email,
      password: auth.password
    };
    return this.http.post<TokenModel>(this.BASE_URL + '/registration', body).pipe(catchError((err: HttpErrorResponse) => {
      if (err.status === 409) {
        return throwError(new Error('User already exists'));
      } else {
        console.log(err);
        return throwError(new Error('Server error. Call to Grisha'));
      }
    }));
  }

  login(auth: AuthModel): Observable<TokenModel> {
    const body = {
      email: auth.email,
      password: auth.password
    };
    return this.http.post<TokenModel>(this.BASE_URL + '/login', body)
      .pipe(catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          return throwError(new Error('Wrong credentials'));
        } else {
          console.log(err);
          return throwError(new Error('Server error. Call to Grisha'));
        }
      }));
  }

  addContact(token: string, contact: ContactModel): Observable<boolean> {
    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': token
    });
    return this.http.post(this.BASE_URL + '/setContact', contact, {headers: headers})
      .pipe(catchError(err => {
        console.log(err);
        return throwError(new Error('Server error'));
      }), map(value => {
        return true;
      }));
  }

  getContacts(token: string): Observable<ContactsModel> {
    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': token
    });
    return this.http.get<ContactsModel>(this.BASE_URL + '/contactsarray', {headers: headers})
      .pipe(catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          return throwError(new Error('Wrong authorization'));
        } else {
          console.log(err);
          return throwError(new Error('Server error. Call to Grisha'));
        }
      }));
  }

  updateContact(token: string, contact: ContactModel): Observable<boolean> {
    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': token
    });
    return this.http.post(this.BASE_URL + '/setContact', contact, {headers: headers})
      .pipe(catchError(err => {
        console.log(err);
        return throwError(new Error('Server error'));
      }), map(value => {
        return true;
      }));
  }

  removeContact(token: string, contactId: number): Observable<boolean> {
    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': token
    });
    const body = {
      contactId: contactId
    };
    return this.http.post(this.BASE_URL + '/contact', body, {headers: headers})
      .pipe(catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          return throwError(new Error('Wrong credentials'));
        } else if (err.status === 409) {
          return throwError(new Error('Wrong contact id or you are not an owner of the contact'));
        } else {
          console.log(err);
          return throwError(new Error('Server error. Call to Grisha'));
        }
      }), map(value => {
          return true;
        }
      ))
      ;
  }

  removeContactList(token: string): Observable<boolean> {
    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': token
    });
    const body = {};
    return this.http.post(this.BASE_URL + '/clearContactsList', body, {headers: headers})
      .pipe(catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          return throwError(new Error('Wrong credentials'));
        } else {
          console.log(err);
          return throwError(new Error('Server error. Call to Grisha'));
        }
      }), map(value => {
          return true;
        }
      ))
      ;
  }
}


