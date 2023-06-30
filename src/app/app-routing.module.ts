import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/superheroes/list/list.component';
import { SubmitComponent } from './components/superheroes/submit/submit.component';
import { UpdateComponent } from './components/superheroes/update/update.component';

const routes: Routes = [{
  path :'superheroes/list',
  component: ListComponent
},
{
  path :'superheroes/submit',
  component: SubmitComponent
},
{
  path :'superheroes/update/:id',
  component: UpdateComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
