import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Room } from './room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  private rooms: Room[] = [];
  private roomsUpdated = new Subject<Room[]>();


  constructor(private http: HttpClient) { }
  getRooms() {
    this.http.get<{ message: string, rooms: any }>
      ('http://localhost:3000/api/rooms')
      .pipe(map((roomData) => {
        return roomData.rooms.map(room => {
          return {
            id: room._id,
            title: room.title,
            description: room.description,
            address: room.address,
            price: room.price,
            discount: room.discount,
            typeid: room.typeid
          };
        });
      }))
      .subscribe((transformedRooms) => {
        this.rooms = transformedRooms;
        this.roomsUpdated.next([...this.rooms]);
      });
  }

  getRoomUpdateListener() {
    return this.roomsUpdated.asObservable();
  }
  addRoom(roomTitle: string, roomDescription: string, roomAddress: string, roomPrice: number, roomDiscount: number, roomTypeid: number) {
    const room: Room = {
      id: null,
      title: roomTitle,
      description: roomDescription,
      address: roomAddress,
      price: roomPrice,
      discount: roomDiscount,
      typeid: roomTypeid
    };
    this.http
      .post<{ message: string, roomId: string }>('http://localhost:3000/api/rooms', room)
      .subscribe(responseData => {
        const id = responseData.roomId;
        room.id = id;
        this.rooms.push(room);
        this.roomsUpdated.next([...this.rooms]);
      });
  }

  deleteRoom(roomId: string) {
    this.http.delete('http://localhost:3000/api/rooms/' + roomId)
      .subscribe(() => {
        const updatedRooms = this.rooms.filter(room => room.id !== roomId);
        this.rooms = updatedRooms;
        this.roomsUpdated.next([...this.rooms]);
      });
  }
}
