import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserModalComponent } from './components/user-modal/user-modal.component';


const routes: Routes = [
  { path: 'list', component: UserListComponent },
  { path: 'adduser', component: UserModalComponent },
  { path: 'detail', component: UserDetailComponent },
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
