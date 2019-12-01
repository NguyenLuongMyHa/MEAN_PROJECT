import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Room } from '../room.model';
import { RoomsService } from '../rooms.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit, OnDestroy {
  /*rooms = [
    {title: 'First Room', description: 'This is the first room'},
    {title: 'Second Room', description: 'This is the second room'},
    {title: 'Third Room', description: 'This is the third room'},

  ];*/
  rooms: Room[] = [];
  private roomsSub: Subscription;
  constructor(public roomsService: RoomsService) {}

  ngOnInit() {
    this.roomsService.getRooms();
    this.roomsSub = this.roomsService.getRoomUpdateListener()
      .subscribe((rooms: Room[]) => {
        this.rooms = rooms;
      });
  }
  onDelete(roomId: string) {
    this.roomsService.deleteRoom(roomId);
  }

  ngOnDestroy() {
    this.roomsSub.unsubscribe();
  }

}
