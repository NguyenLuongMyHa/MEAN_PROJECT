import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RoomsService } from '../rooms.service';
import { Room } from '../room.model';
import { ActivatedRoute, ParamMap } from '@angular/router';

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
  newRoomTitle = 'New Title';
  newRoomDescription = 'New Description';
  newRoomAddress = 'New Address';
  newRoomPrice = 1000000;
  newRoomDiscount = 0;
  selectedType = 1;
  types: ProductType[] = [
    { id: 1, typeName: 'Single', capacity: 2 },
    { id: 2, typeName: 'Double', capacity: 4 },
    { id: 3, typeName: 'Family', capacity: 8 },
    { id: 4, typeName: 'Family Deluxe', capacity: 10 },
  ];
  room: Room;
  private mode = 'create';
  private roomId: string;

  constructor(
    public roomsService: RoomsService,
    public route: ActivatedRoute) { }
  getTypeCapacityById(id) {
    return this.types.find(x => x.id === id).capacity;
  }
  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('roomId')) {
        this.mode = 'edit';
        this.roomId = paramMap.get('roomId');
        this.roomsService.getRoom(this.roomId)
        .subscribe(roomData => {
          this.room = {
            id: roomData._id,
            title: roomData.title,
            description: roomData.description,
            address: roomData.description,
            price: roomData.price,
            discount: roomData.discount,
            typeid: roomData.typeid
          };
        });
      } else {
        this.mode = 'create';
        this.roomId = null;
      }
    });
  }

  onAddRoom(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.roomsService.addRoom(
      form.value.title,
      form.value.description,
      form.value.address,
      form.value.price,
      form.value.discount,
      form.value.type,
    );
    form.resetForm();
  }
  onSaveRoom(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.roomsService.addRoom(
        form.value.title,
        form.value.description,
        form.value.address,
        form.value.price,
        form.value.discount,
        form.value.type,
      );
    } else {
      this.roomsService.updateRoom(
        this.roomId,
        form.value.title,
        form.value.description,
        form.value.address,
        form.value.price,
        form.value.discount,
        form.value.type,
      );
    }
    form.resetForm();
  }
}
