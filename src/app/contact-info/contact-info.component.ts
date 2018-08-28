import {Component, OnDestroy, OnInit} from '@angular/core';
import {ContactsInteractor} from '../business/contacts.interactor';
import {ActivatedRoute, RouterLinkActive} from '@angular/router';
import {ContactModel} from '../dto/contact.model';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styles: []
})
export class ContactInfoComponent implements OnInit, OnDestroy {
  current: ContactModel = null;
  temp: ContactModel = null;
  flag = false;
  subscriber;

  constructor(public interactor: ContactsInteractor, private router: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscriber = this.interactor.subject.subscribe(value => {
      const id = this.router.snapshot.params['id'];
      this.current = this.interactor.contacts[id];
    });
    this.router.params.subscribe(value => {
      this.current = this.interactor.contacts[value['id']];
    });
  }

  changeContact() {
    this.flag = !this.flag;
    this.interactor.updateContact(this.current);
  }

  onEdit() {
    console.log(this.flag);
    this.flag = !this.flag;
    this.temp = this.current;
  }

  onCancel() {
    this.current = this.temp;
    this.flag = false;
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }

}
