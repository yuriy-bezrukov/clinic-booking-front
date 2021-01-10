import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar/calendar.component';
import { DayComponent } from './day/day.component';
import { RecordComponent } from './record/record.component';
import { CalendarRoutingModule } from './calendar.routing';



@NgModule({
  declarations: [
    CalendarComponent,
    DayComponent,
    RecordComponent,
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule
  ]
})
export class CalendarModule { }
