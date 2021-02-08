import { Component, OnInit } from '@angular/core';
import { RoomsService } from 'src/app/core/services/users/rooms.service';

@Component({
  templateUrl: './private-rooms-layout.component.html'
})
export class PrivateRoomsLayoutComponent implements OnInit {

  constructor(
    public roomsService: RoomsService
  ) { }

  ngOnInit(): void {
  }

}
