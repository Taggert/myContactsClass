import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {HttpProvider} from './providers/http.provider';
import {StoreProvider} from './providers/store.provider';
import {AuthProvider} from './providers/auth.provider';

const routes: Routes = [
  {path: '', loadChildren: './home.module#HomeModule'},
  {path: 'contacts', canActivate: [AuthProvider], loadChildren: './contacts.module#ContactsModule'},
  {path: 'add', canActivate: [AuthProvider], loadChildren: './add-contact.module#AddContactModule'},
  {path: 'login', loadChildren: './login.module#LoginModule'},
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  declarations: [
    AppComponent
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
export class AppModule {
}
