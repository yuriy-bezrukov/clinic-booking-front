import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from './panel/panel.component';
import { PanelRoutingModule } from './panel.routing';
import { SharedModule } from '@shared/shared.module';
import {MatTabsModule} from '@angular/material/tabs';



@NgModule({
  declarations: [PanelComponent],
  imports: [
    CommonModule,
    SharedModule,
    PanelRoutingModule,
    MatTabsModule,
  ]
})
export class PanelModule { }
