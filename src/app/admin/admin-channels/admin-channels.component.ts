import { Component, OnInit } from '@angular/core';
import { ChatRoom } from '../../shared/models/chat-room.model';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-channels',
  templateUrl: './admin-channels.component.html',
  styleUrls: [ './admin-channels.component.scss' ]
})
export class AdminChannelsComponent implements OnInit
{
  channels: ChatRoom[] = [];

  constructor(private adminService: AdminService) {
  }

  ngOnInit() {
    this.adminService.getChannels()
      .then((rooms: ChatRoom[]) => this.channels.push(...rooms))
      .catch(err => console.error(err));
  }

}
