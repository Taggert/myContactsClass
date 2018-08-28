import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { ContactsComponent } from './contacts/contacts.component';
import { LoginComponent } from './login/login.component';
import { AddComponent } from './add/add.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {HttpProvider} from './providers/http.provider';
import {StoreProvider} from './providers/store.provider';
import {AuthProvider} from './providers/auth.provider';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'contacts', component: ContactsComponent, canActivate: [AuthProvider], children: [
      {path: ':id', component: ContactInfoComponent}]},
  {path: 'add', canActivate: [AuthProvider], component: AddComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ContactsComponent,
    LoginComponent,
    AddComponent,
    ContactInfoComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule
  ],
  providers: [HttpProvider, StoreProvider, AuthProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
