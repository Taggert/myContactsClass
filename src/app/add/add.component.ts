import {Component, OnInit} from '@angular/core';
import {ContactModel} from '../dto/contact.model';
import {AddInteractor} from '../business/add.interactor';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [],
  providers: [AddInteractor]
})
export class AddComponent implements OnInit {

  contact: ContactModel;

  constructor(private interactor: AddInteractor) {
  }

  ngOnInit(): void {
    this.contact = {
      contactId: null,
      email: '',
      fullName: '',
      phoneNumber: '',
      description: '',
      address: ''
    };
  }

  onAdd() {
    console.log(this.contact);
    this.interactor.addContact(this.contact);
  }
}
