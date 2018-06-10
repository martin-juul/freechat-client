import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ParseUrl } from './parse-url.pipe';

const PIPES = [
  //ParseUrl
];

@NgModule({
  declarations: [
    ...PIPES
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ...PIPES
  ]
})
export class SharedPipeModule { }
