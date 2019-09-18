import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GetDepartmentsComponent} from './get-departments/get-departments.component';
import {HomeComponent} from './home/home.component';
import {EditComponent} from './edit/edit.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'getDepartment', component: GetDepartmentsComponent},
  {path:'editPage/:data',component:EditComponent},
  {path:'editPage/matTabContent1/:data',component:EditComponent},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
