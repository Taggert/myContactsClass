import {Component, OnInit} from '@angular/core';
import {ContactsInteractor} from '../business/contacts.interactor';
import {ContactModel} from '../dto/contact.model';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styles: [],
  providers: [ContactsInteractor]
})
export class ContactsComponent implements OnInit {

  constructor(public interactor: ContactsInteractor) {
  }

  ngOnInit() {
    this.interactor.getAllContacts();
  }

  onRemove(contactId) {
    this.interactor.removeContact(contactId);
  }

  onRemoveList() {
    this.interactor.removeContactList();
  }

}
