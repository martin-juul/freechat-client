import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatSelectModule, MatSidenavModule,
  MatToolbarModule
} from '@angular/material';

const MODULES = [
  MatButtonModule,
  MatCheckboxModule,
  MatCardModule,
  MatExpansionModule,
  MatGridListModule,
  MatListModule,
  MatToolbarModule,
  MatChipsModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatMenuModule,
  MatDividerModule,
  MatPaginatorModule,
  MatSidenavModule,
];

@NgModule({
  imports: [
    ...MODULES
  ],
  exports: [
    ...MODULES
  ]
})
export class AngularMaterialModule
{
}
