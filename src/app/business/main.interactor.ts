import {Injectable} from '@angular/core';
import {StoreProvider} from '../providers/store.provider';

@Injectable()
export class MainInteractor {

  constructor(private store: StoreProvider) {
  }

  checkToken(): boolean {
    return this.store.getToken() ? true : false;
  }

  logout(): void {
    localStorage.removeItem('TOKEN');
  }
}
