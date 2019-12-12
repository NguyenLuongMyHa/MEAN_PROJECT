import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoomListComponent } from './rooms/room-list/room-list.component';
import { RoomCreateComponent } from './rooms/room-create/room-create.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: RoomListComponent },
  { path: 'create', component: RoomCreateComponent },
  { path: 'edit/:roomId', component: RoomCreateComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
