import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoneyPipe } from './money.pipe';

const pipes = [MoneyPipe];

@NgModule({
  declarations: [...pipes],
  exports: [...pipes],
  imports: [
    CommonModule
  ]
})
export class SharedPipeModule { }
