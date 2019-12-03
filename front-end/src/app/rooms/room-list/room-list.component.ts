import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Room } from '../room.model';
import { RoomsService } from '../rooms.service';
import { PageEvent } from '@angular/material';

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
  totalPage = 0;
  perPage = 2;
  pagesizeOption = [1, 2, 5, 10];
  currentPage = 1;
  isLoading = false;
  private roomsSub: Subscription;
  constructor(public roomsService: RoomsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.roomsService.getRooms(this.perPage, this.currentPage);
    this.roomsSub = this.roomsService.getRoomUpdateListener()
      .subscribe((roomData: {rooms: Room[], roomCount: number}) => {
        this.isLoading = false;
        this.totalPage = roomData.roomCount;
        this.rooms = roomData.rooms;
      });
  }
  onDelete(roomId: string) {
    this.isLoading = true;
    this.roomsService.deleteRoom(roomId).subscribe(() => {
      this.roomsService.getRooms(this.perPage, this.currentPage);
    });
  }

  ngOnDestroy() {
    this.roomsSub.unsubscribe();
  }

  onchangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.perPage = pageData.pageSize;
    this.roomsService.getRooms(this.perPage, this.currentPage);
  }

}
