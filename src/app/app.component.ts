import {Component, OnInit} from '@angular/core';
import {MainInteractor} from './business/main.interactor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [],
  providers: [MainInteractor]
})
export class AppComponent {

  constructor(private interactor: MainInteractor) {

  }


  checkToken(): boolean {
    return this.interactor.checkToken();
  }

  onLogout(): void {
    this.interactor.logout();
  }


}
