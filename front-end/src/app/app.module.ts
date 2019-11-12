import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
  MatInputModule,
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatSelectModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoomCreateComponent } from './rooms/room-create/room-create.component';
import { HeaderComponent } from './header/header.component';
import { RoomListComponent } from './rooms/room-list/room-list.component';
import { RoomService } from './rooms/room.service';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RoomCreateComponent,
    RoomListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatSelectModule,
    HttpClientModule
  ],
  providers: [RoomService],
  bootstrap: [AppComponent],
})
export class AppModule { }
