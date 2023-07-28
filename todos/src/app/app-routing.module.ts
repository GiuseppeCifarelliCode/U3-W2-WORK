import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from './pages/todo/todo.component';
import { CompletedComponent } from './pages/completed/completed.component';

const routes: Routes = [
  {
    path:'',
    component:TodoComponent,
    pathMatch:'full'
  },
  {
    path:'todo',
    component:TodoComponent
  },
  {
    path:'completed',
    component:CompletedComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
