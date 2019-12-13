import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Room } from './room.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  private rooms: Room[] = [];
  private roomsUpdated = new Subject<{rooms: Room[], roomCount: number}>();
  private roomsUpdated2 = new Subject<Room[]>();


  constructor(private http: HttpClient, private router: Router) { }
  getRooms(perPage: number, currentPage: number) {
    const queryParams = `?pageSize=${perPage}&page=${currentPage}`;
    this.http.get<{ message: string, rooms: any, maxRooms: number}>
      ('http://localhost:3000/api/rooms' + queryParams)
      .pipe(map(roomData => {
        return {
          rooms: roomData.rooms.map(room => {
          return {
            id: room._id,
            title: room.title,
            description: room.description,
            address: room.address,
            price: room.price,
            discount: room.discount,
            typeid: room.typeid,
            imagePath: room.imagePath,
            creator: room.creator
          };
        }),
        maxRooms: roomData.maxRooms
      };
      }))
      .subscribe((transformedRoomsData) => {
        this.rooms = transformedRoomsData.rooms;
        this.roomsUpdated.next({
          rooms: [...this.rooms],
          roomCount: transformedRoomsData.maxRooms});
      });
  }
  getRoom(id: string) {
    return this.http.get<{
      _id: string,
      title: string,
      description: string,
      address: string,
      price: number,
      discount: number,
      typeid: number,
      imagePath: string,
      creator: string
    }>('http://localhost:3000/api/rooms/' + id);
  }
  getRoomUpdateListener() {
    return this.roomsUpdated.asObservable();
  }
  addRoom(roomTitle: string,
          roomDescription: string,
          roomAddress: string,
          roomPrice: number,
          roomDiscount: number,
          roomTypeid: number,
          image: File) {
    const roomData = new FormData();
    roomData.append('title', roomTitle);
    roomData.append('description', roomDescription);
    roomData.append('address', roomAddress);
    roomData.append('price', roomPrice.toString());
    roomData.append('discount', roomDiscount.toString());
    roomData.append('typeid', roomTypeid.toString());
    roomData.append('image', image, roomTitle);
    this.http
      .post<{ message: string; room: Room }>(
        'http://localhost:3000/api/rooms',
        roomData
      )
      .subscribe(responseData => {

        const room: Room = {
          id: responseData.room.id,
          title: roomTitle,
          description: roomDescription,
          address: roomAddress,
          price: roomPrice,
          discount: roomDiscount,
          typeid: roomTypeid,
          imagePath: responseData.room.imagePath,
          creator: responseData.room.creator
        };
        this.rooms.push(room);
        this.roomsUpdated2.next([...this.rooms]);
        this.router.navigate(['/']);
      });
  }

  updateRoom(roomid: string,
             roomTitle: string,
             roomDescription: string,
             roomAddress: string,
             roomPrice: number,
             roomDiscount: number,
             roomTypeid: number,
             image: File | string) {
    let roomData: Room | FormData;
    if (typeof image === 'object') {
      roomData = new FormData();
      roomData.append('id', roomid);
      roomData.append('title', roomTitle);
      roomData.append('description', roomDescription);
      roomData.append('address', roomAddress);
      roomData.append('price', roomPrice.toString());
      roomData.append('discount', roomDiscount.toString());
      roomData.append('typeid', roomTypeid.toString());
      roomData.append('image', image, roomTitle);
    } else {
      roomData = {
        id: roomid,
        title: roomTitle,
        description: roomDescription,
        address: roomAddress,
        price: roomPrice,
        discount: roomDiscount,
        typeid: roomTypeid,
        imagePath: image,
        creator: null
      };
    }
    this.http
      .put('http://localhost:3000/api/rooms/' + roomid, roomData)
      .subscribe(response => {
        const updatedRooms = [...this.rooms];
        const oldRoomIndex = updatedRooms.findIndex(p => p.id === roomid);
        const room: Room = {
          id: roomid,
          title: roomTitle,
          description: roomDescription,
          address: roomAddress,
          price: roomPrice,
          discount: roomDiscount,
          typeid: roomTypeid,
          imagePath: '',
          creator: null
        };
        updatedRooms[oldRoomIndex] = room;
        this.rooms = updatedRooms;
        this.roomsUpdated2.next([...this.rooms]);
        this.router.navigate(['/']);
      });
  }

  deleteRoom(roomId: string) {
    return this.http.delete('http://localhost:3000/api/rooms/' + roomId)
      /*
    .subscribe(() => {
        const updatedRooms = this.rooms.filter(room => room.id !== roomId);
        this.rooms = updatedRooms;
        this.roomsUpdated.next([...this.rooms]);
      })*/;
  }
}
