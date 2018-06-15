import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../shared/modules/angular-material.module';

import { AdminChannelsComponent } from './admin-channels/admin-channels.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminService } from './admin.service';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AdminRoutingModule,
    AngularMaterialModule,
  ],
  declarations: [
    AdminChannelsComponent
  ],
  providers: [
    AdminService
  ]
})
export class AdminModule { }
