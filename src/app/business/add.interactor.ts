import {Injectable} from '@angular/core';
import {HttpProvider} from '../providers/http.provider';
import {StoreProvider} from '../providers/store.provider';
import {ContactModel} from '../dto/contact.model';

@Injectable()
export class AddInteractor {

  constructor(private http: HttpProvider, protected store: StoreProvider) {
  }

  addContact(contact: ContactModel) {
    const token = this.store.getToken();
    if (token != null) {
      this.http.addContact(token, contact).subscribe(value => {
        if (value) {
          console.log('Contact added');
        }
      }, err => {
        console.log(err);
      });
    }
  }
}
