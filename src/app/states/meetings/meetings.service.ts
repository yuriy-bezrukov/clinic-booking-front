import { Injectable } from '@angular/core';
import { MeetingsStore } from './meetings.store';
import { webSocket } from "rxjs/webSocket";
import { Meeting } from './meeting.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

export class CreateMeetingDto {
  date: number;
  patientId: string;
  doctorId: string;
}

export enum WsMeetingEvent {
  createMeeting = 'createMeeting',
  createdMeeting = 'createdMeeting',
  removeMeeting = 'removeMeeting',
  removedMeeting = 'removedMeeting',
}

export interface WsMeetingResponse {
  event: WsMeetingEvent,
  data: Partial<Meeting>;
}

@Injectable({ providedIn: 'root' })
export class MeetingsService {

  private readonly subject = webSocket<WsMeetingResponse>('ws://localhost:8080');

  constructor(
    protected store: MeetingsStore,
    private http: HttpClient,
  ) { }

  subscribe() {
    this.subject.subscribe(
      msg => {
        switch (msg.event) {
          case WsMeetingEvent.createdMeeting:
            this.onCreated(msg.data as Meeting);
            break;
          case WsMeetingEvent.removedMeeting:
            this.onRemoved(msg.data as Meeting);
            break;
          default:
            console.warn('WS MeetingsService - uncatch:', msg)
            break;
        }
      },
      err => console.warn('WS MeetingsService - error:', err),
      () => console.warn('WS MeetingsService - complete')
    );

    return this.getAll();
  }

  unsubscribe() {
    this.subject.complete();
  }

  getAll() {
    return this.http.get<Meeting[]>(`${environment.api}meetings`).pipe(
      catchError(err => {
        return throwError(err);
      }),
      tap(meetings => {
        debugger
        this.store.set(meetings);
      })
    )
  }

  create(createMeetingDto: CreateMeetingDto) {
    this.subject.next({ event: WsMeetingEvent.createMeeting, data: createMeetingDto });
  }

  onCreated(meeting: Meeting) {
    this.store.add(meeting);
  }

  remove(meeting: Meeting) {
    this.subject.next({ event: WsMeetingEvent.removeMeeting, data: meeting });
  }

  onRemoved(meeting: Meeting) {
    this.store.remove(meeting._id);
  }



}
