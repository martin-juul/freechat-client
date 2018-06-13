import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularMaterialModule } from '../modules/angular-material.module';
import { ParseUrl } from '../pipes/parse-url.pipe';
import { ChatRoomService } from '../services/chat-room.service';
import { ChatComponent } from './chat/chat.component';

import { NavigationComponent } from './navigation/navigation.component';

const BASE_MODULES = [
  CommonModule,
  AngularMaterialModule,
  RouterModule,
  FontAwesomeModule,
  FormsModule,
];

const COMPONENTS = [
  NavigationComponent,
  ChatComponent
];

@NgModule({
  imports: [
    ...BASE_MODULES,
  ],
  declarations: [
    ...COMPONENTS,
    ParseUrl
  ],
  exports: [
    ...COMPONENTS
  ],
  providers: [
    ChatRoomService
  ]
})
export class SharedComponentModule
{
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: SharedComponentModule,
      providers: []
    };
  }
}
