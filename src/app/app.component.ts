import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from './app.config';
import { ElectronService } from './providers/electron.service';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit
{
  isLoggedIn = false;

  constructor(public electronService: ElectronService,
              private translate: TranslateService,
              private userService: UserService) {

    translate.setDefaultLang('en');
    console.log('AppConfig', AppConfig);

    if (electronService.isElectron()) {
      console.log('Mode electron');
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      console.log('Mode web');
    }
  }

  ngOnInit() {
    this.setLoginStatus();
  }

  setLoginStatus() {
    if (this.userService.getUser().id) {
      this.isLoggedIn = true;
    }
  }
}
