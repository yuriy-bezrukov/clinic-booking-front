import { Component, OnInit } from '@angular/core';
import { MeetingsService, CreateMeetingDto } from '@app/states/meetings/meetings.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  constructor(
    private meetingsService: MeetingsService
  ) { }

  ngOnInit(): void {
    this.meetingsService.subscribe().subscribe(x => {
      debugger
    });

    // setTimeout(() => {
    //   this.meetingsService.create({
    //     date: 1111,
    //     doctorId: '12324',
    //     patientId: '23432423'
    //   } as CreateMeetingDto);
    // }, 3000);
  }

}
