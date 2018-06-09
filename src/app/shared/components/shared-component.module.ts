import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationComponent } from './navigation/navigation.component';
import { AngularMaterialModule } from '../modules/angular-material.module';
import { RouterModule } from '@angular/router';

const BASE_MODULES = [
  CommonModule,
  AngularMaterialModule,
  RouterModule
];

const COMPONENTS = [
  NavigationComponent
];

@NgModule({
  imports: [
    ...BASE_MODULES
  ],
  declarations: [
    ...COMPONENTS
  ],
  exports: [
    ...COMPONENTS
  ],
})
export class SharedComponentModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: SharedComponentModule,
      providers: []
    }
  }
}
