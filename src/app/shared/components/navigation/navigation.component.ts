import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCog, faSignOut } from '@fortawesome/pro-regular-svg-icons';
import { ChatRoom } from '../../models/chat-room.model';
import { User } from '../../models/user.model';
import { ChatRoomService } from '../../services/chat-room.service';
import { SocketService } from '../../services/socket.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: [ './navigation.component.scss' ]
})
export class NavigationComponent implements OnInit
{
  user: User;
  faCog = faCog;
  faSignOut = faSignOut;
  rooms: ChatRoom[] = [];
  currentChatRoom: ChatRoom;

  /*public navItems = [
    {
      label: 'Channels',
      goTo: '/channels',
      subMenu: [
        { label: 'General', goTo: '/channels/general' },
        { label: 'Code', goTo: '/channels/general' },
        { label: 'Games', goTo: '/channels/general' },
      ],
    },
    {
      label: 'Friends',
      goTo: '/friends',
      subMenu: [
        { label: 'Grand Master', icon: 'https://via.placeholder.com/100x100', goTo: '/friends/grand-master' },
        { label: 'Egon Olsen', icon: 'https://via.placeholder.com/100x100', goTo: '/friends/egon-olsen' },
        { label: 'Børge Mogensen', icon: 'https://via.placeholder.com/100x100', goTo: '/friends/borge-mogensen' },
        { label: 'Cooper', icon: 'https://via.placeholder.com/100x100', goTo: '/friends/cooper' },
      ]
    },
  ];*/

  public navItems = [];

  constructor(private userService: UserService,
              private router: Router,
              private socketService: SocketService,
              private chatRoomService: ChatRoomService) {
  }

  ngOnInit() {
    this.user = this.userService.getUser();
    this.socketService.getRooms()
      .then((chatRooms: ChatRoom[]) => {
        chatRooms.forEach(cRoom => this.rooms.push(cRoom));

        this.navItems.push({
          label: 'Channels',
          subMenu: [ ...this.rooms ]
        });

      })
      .catch(err => console.error(err));
  }

  changeChannel(room: ChatRoom) {
    if (!room) {
      this.currentChatRoom = room;
      this.chatRoomService.setRoom(room);
      return;
    } else if (room === this.currentChatRoom) {
      return;
    } else {
      this.currentChatRoom = room;
      this.chatRoomService.setRoom(room);
      return;
    }

  }

  logOut() {
    this.userService.logOutUser();
    this.router.navigateByUrl('/auth/signin')
      .then(() => {
        console.log('User logged out!');
        this.user = null;
      });
  }

}
