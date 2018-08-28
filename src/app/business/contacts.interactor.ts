import {Injectable} from '@angular/core';
import {HttpProvider} from '../providers/http.provider';
import {StoreProvider} from '../providers/store.provider';
import {ContactsModel} from '../dto/contacts.model';
import {ContactModel} from '../dto/contact.model';
import {TokenModel} from '../dto/token.model';
import {Subject} from 'rxjs';

@Injectable()
export class ContactsInteractor {

  contacts: ContactModel[] = [];
  subject;

  constructor(private http: HttpProvider, private store: StoreProvider) {
    this.subject = new Subject();
  }

  getAllContacts() {
    const token = this.store.getToken();
    if (token != null) {
      this.http.getContacts(token).subscribe((value: ContactsModel) => {
          this.contacts = value.contacts;
          this.subject.next();
        },
        err => {
          console.log(err);
          this.contacts = [];
        });
    }
  }

  updateContact(contact: ContactModel): void {
    const token = this.store.getToken();
    if (token != null) {
      this.http.updateContact(token, contact).subscribe(value => {
        if (value) {
          this.getAllContacts();
        }
      }, err => {
        console.log(err);
      });
    }
  }

  removeContact(contactId: number): void {
    const token = this.store.getToken();
    if (token != null) {
      this.http.removeContact(token, contactId).subscribe(value => {
        if (value) {
          this.getAllContacts();
        }
      }, err => {
        console.log(err);
      });
    }
  }

  removeContactList(): void {
    const token = this.store.getToken();
    if (token != null) {
      this.http.removeContactList(token).subscribe(value => {
        if (value) {
          this.getAllContacts();
        }
      }, err => {
        console.log(err);
      });
    }
  }


}
