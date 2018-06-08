import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  public navItems = [
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
  ];

  public user = {
    username: 'MartinJuul',
    avatar: 'https://via.placeholder.com/100x100'
  };

  constructor() { }

  ngOnInit() {
  }

}
