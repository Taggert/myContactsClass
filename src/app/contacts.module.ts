import {NgModule} from '@angular/core';
import {ContactsComponent} from './contacts/contacts.component';
import {ContactInfoComponent} from './contact-info/contact-info.component';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {StoreProvider} from './providers/store.provider';
import {HttpProvider} from './providers/http.provider';
import {FormsModule} from '@angular/forms';

const contactsRoutes: Routes = [
  {path: '', component: ContactsComponent, children: [
      {path: ':id', component: ContactInfoComponent}
    ]}
];

@NgModule({
  declarations: [
    ContactsComponent,
    ContactInfoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(contactsRoutes),
    FormsModule
  ]
})
export class ContactsModule {

}
