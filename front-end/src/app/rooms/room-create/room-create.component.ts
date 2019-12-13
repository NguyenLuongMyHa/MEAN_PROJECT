import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { RoomsService } from '../rooms.service';
import { Room } from '../room.model';
import { mimeType } from './mime-type.validator';

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
  types: ProductType[] = [
    { id: 1, typeName: 'Single', capacity: 2 },
    { id: 2, typeName: 'Double', capacity: 4 },
    { id: 3, typeName: 'Family', capacity: 8 },
    { id: 4, typeName: 'Family Deluxe', capacity: 10 },
  ];
  room: Room;
  isLoading = false;
  form: FormGroup;
  imagePreview: string | ArrayBuffer;
  mode = 'create';
  private roomId: string;

  constructor(
    public roomsService: RoomsService,
    public route: ActivatedRoute) { }
  getTypeById(id) {
    return this.types.find(x => x.id === id);
  }
  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required]
      }),
      description: new FormControl(null, {
        validators: [Validators.required]
      }),
      address: new FormControl(null, {
        validators: [Validators.required]
      }),
      price: new FormControl(null, {
        validators: [Validators.required]
      }),
      discount: new FormControl(null, {
        validators: [Validators.required]
      }),
      typeid: new FormControl(null, {
        validators: [Validators.required]
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('roomId')) {
        this.mode = 'edit';
        this.roomId = paramMap.get('roomId');
        this.isLoading = true;
        this.roomsService.getRoom(this.roomId)
          .subscribe(roomData => {
            this.isLoading = false;
            this.room = {
              id: roomData._id,
              title: roomData.title,
              description: roomData.description,
              address: roomData.address,
              price: roomData.price,
              discount: roomData.discount,
              typeid: roomData.typeid,
              imagePath: roomData.imagePath,
              creator: roomData.creator
            };
            this.form.setValue({
              title: this.room.title,
              description: this.room.description,
              address: this.room.address,
              price: this.room.price,
              discount: this.room.discount,
              typeid: this.room.typeid,
              image: this.room.imagePath
            });
          });
      } else {
        this.mode = 'create';
        this.roomId = null;
      }
    });
  }
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onSaveRoom() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.roomsService.addRoom(
        this.form.value.title,
        this.form.value.description,
        this.form.value.address,
        this.form.value.price,
        this.form.value.discount,
        this.form.value.typeid,
        this.form.value.image
      );
    } else {
      this.roomsService.updateRoom(
        this.roomId,
        this.form.value.title,
        this.form.value.description,
        this.form.value.address,
        this.form.value.price,
        this.form.value.discount,
        this.form.value.typeid,
        this.form.value.image
      );
    }
    this.form.reset();
  }
}
