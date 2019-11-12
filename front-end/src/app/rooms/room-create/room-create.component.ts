import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RoomService } from '../room.service';

export interface ProductType {
  id: number;
  typeName: string;
  capacity: number;
}
@Component({
  selector: 'app-room-create',
  templateUrl: './room-create.component.html',
  styleUrls: ['./room-create.component.css']
})
export class RoomCreateComponent implements OnInit {
  newRoomTitle = '';
  newRoomDescription = '';
  newRoomAddress = '';

  selectedType: string;
  types: ProductType[] = [
    {id: 1, typeName: 'Single', capacity: 2},
    {id: 2, typeName: 'Double', capacity: 4},
    {id: 3, typeName: 'Family', capacity: 8},
    {id: 4, typeName: 'Family Deluxe', capacity: 10},
  ];
  constructor(public roomsService: RoomService) { }

  ngOnInit() {
  }

  onAddRoom(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.roomsService.addRoom(
      form.value.title,
      form.value.description,
      form.value.address,
      form.value.typeId,
      form.value.price,
      form.value.discount);
    form.resetForm();
  }
}
