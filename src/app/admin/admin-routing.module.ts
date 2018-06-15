import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminChannelsComponent } from './admin-channels/admin-channels.component';

const adminRoutes: Routes = [
  { path: '', component: AdminChannelsComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(adminRoutes) ],
  exports: [ RouterModule ]
})
export class AdminRoutingModule
{
}
