import { Component, Input, OnInit } from '@angular/core';
import { Meeting } from '@app/states/meetings/meeting.model';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {

  @Input() meeting: Meeting;

  constructor() { }

  ngOnInit(): void {
  }

}
