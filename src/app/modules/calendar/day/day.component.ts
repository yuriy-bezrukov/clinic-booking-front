import { Component, OnInit } from '@angular/core';

const START_HOUR = 6;
const END_HOUR = 20;
const INTERVAL_IN_MINUTS = 30;
const HOUR = 60;

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnInit {

  meetings: {
    date: Date;
    str: string;
  }[] = [];

  constructor() { }

  ngOnInit(): void {
    this.meetings = this.getMeetings();
  }

  getMeetings(date = '01-01-2020') {
    const meetingDate = new Date(date);
    const meetings: Date[] = [];

    for (let hour = START_HOUR; hour < END_HOUR; hour++) {
      meetingDate.setHours(hour, 0);
      for (let minuts = 0; minuts < HOUR; minuts += INTERVAL_IN_MINUTS) {
        meetingDate.setMinutes(minuts);
        meetings.push(new Date(meetingDate));
      }
    }
    return meetings.map(date => ({ date, str: this.datePipe(date) }));
  }

  datePipe(date: Date) {
    const hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours();
    const minute = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
    return `${hour}-${minute}`;
  }

}
