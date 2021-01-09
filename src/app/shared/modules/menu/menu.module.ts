import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [MenuComponent],
  exports: [MenuComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
  ]
})
export class MenuModule { }
