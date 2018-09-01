import {NgModule} from '@angular/core';
import {AddComponent} from './add/add.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

const addRoutes: Routes = [
  {path: '', component: AddComponent}
];

@NgModule({
  declarations: [
    AddComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(addRoutes),
    FormsModule
  ]
})
export class AddContactModule {

}
