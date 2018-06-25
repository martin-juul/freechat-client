import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularMaterialModule } from '../modules/angular-material.module';
import { ParseUrl } from '../pipes/parse-url.pipe';
import { ChatComponent } from './chat/chat.component';

import { NavigationComponent } from './navigation/navigation.component';
import { VideoChatComponent } from './video-chat/video-chat.component';

const BASE_MODULES = [
  CommonModule,
  AngularMaterialModule,
  RouterModule,
  FontAwesomeModule,
  FormsModule,
];

const COMPONENTS = [
  NavigationComponent,
  ChatComponent,
  VideoChatComponent,
];

const PIPES = [
  ParseUrl
];

@NgModule({
  imports: [
    ...BASE_MODULES,
  ],
  declarations: [
    ...COMPONENTS,
    ...PIPES,
  ],
  exports: [
    ...COMPONENTS,
    ...PIPES
  ],
  providers: [
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
