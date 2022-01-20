import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TechnicianComponent } from './components/technician/technician.component';

// here, put all routes that you need use.
const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'technician'},
  {path: 'technician', component: TechnicianComponent},
  {path: '**', redirectTo: '/'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
