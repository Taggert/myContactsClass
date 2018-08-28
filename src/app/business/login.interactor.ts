import {Injectable} from '@angular/core';
import {HttpProvider} from '../providers/http.provider';
import {StoreProvider} from '../providers/store.provider';
import {Observable} from 'rxjs';
import {AuthModel} from '../dto/auth.model';
import {map} from 'rxjs/operators';

@Injectable()
export class LoginInteractor {

  constructor(private http: HttpProvider, protected store: StoreProvider) {
  }

  registration(email: string, password: string): Observable<boolean> {
    const auth = new AuthModel(email, password);
    return this.http.registration(auth).pipe(
      map(value => {
        this.store.saveToken(value.token);
        return true;
      })
    );
  }

  login(email: string, password: string): Observable<boolean> {
    const auth = new AuthModel(email, password);
    return this.http.login(auth).pipe(
      map(value => {
        this.store.saveToken(value.token);
        return true;
      })
    );
  }
}
