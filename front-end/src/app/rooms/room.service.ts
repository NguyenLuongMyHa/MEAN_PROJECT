import { Injectable } from '@angular/core';
import { Room } from './room.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private rooms: Room[] = [];
  private roomsUpdated = new Subject<Room[]>();


  constructor(private http: HttpClient) { }
  getRooms() {
    this.http.get<{message: string, rooms: Room[]}>('http://localhost:3000/rooms')
    .subscribe((roomsData) => {
      this.rooms = roomsData.rooms;
      this.roomsUpdated.next([...this.rooms]);
    });
  }

  getRoomUpdateListener() {
    return this.roomsUpdated.asObservable();
  }
  addRoom(title: string, description: string, address: string, typeId: number, price: number, discount?: number) {
    const room: Room = {id: null, title, description, address, typeId, price, discount };
    this.http.post<{ message: string }>('http://localhost:3000/rooms', room)
    .subscribe((responseData) => {
      console.log(responseData.message);
      this.rooms.push(room);
      this.roomsUpdated.next([...this.rooms]);
    });
  }
}
