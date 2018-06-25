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


  friendList =    {
      label: 'Friends',
      goTo: '/friends',
      subMenu: [
        { label: 'Snowy', icon: 'https://via.placeholder.com/100x100', goTo: '/chat', navType: 'friend', },
        { label: 'Egon', icon: 'https://via.placeholder.com/100x100', goTo: '/chat', navType: 'friend' },
      ]
    };

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

        this.navItems.push(this.friendList);

      })
      .catch(err => console.error(err));
  }

  changeChannel(room: ChatRoom) {
    if (!this.currentChatRoom) {
      this.currentChatRoom = room;
      this.chatRoomService.setRoom(room);
      this.router.navigateByUrl('/chat');
      return;
    } else if (room === this.currentChatRoom) {
      return;
    } else {
      this.socketService.disconnect();
      this.currentChatRoom = room;
      //this.chatRoomService.clearRoom();
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
