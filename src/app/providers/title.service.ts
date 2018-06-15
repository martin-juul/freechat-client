import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ElectronService } from './electron.service';

@Injectable()
export class TitleService
{
  private suffix = ' | FreeChat';

  constructor(private titleService: Title,
              private electronService: ElectronService) { }

  public setTitle(title: string) {
    if (!this.electronService.isElectron()) {
      this.titleService.setTitle(title + this.suffix);
    }
  }
}
