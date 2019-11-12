import { Component, OnInit, OnDestroy } from '@angular/core';
import { Room } from '../room.model';
import { RoomService } from '../room.service';
import { Subscription } from 'rxjs';

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
  private roomSubs: Subscription[] = [];
  roomSubUpdate: Subscription = new Subscription();
  constructor(public roomsService: RoomService) {}

  ngOnInit() {
    // Get rooms and start to subscribe to know any change
    this.roomsService.getRooms();
    this.roomSubUpdate = this.roomsService.getRoomUpdateListener().subscribe((rooms: Room[]) => {
      this.rooms = rooms;
    });
    this.roomSubs.push(this.roomSubUpdate);
  }

  ngOnDestroy() {
    // when component is destroyed, stop subscribe
    this.roomSubs.forEach((subscription) => subscription.unsubscribe());
  }

}
