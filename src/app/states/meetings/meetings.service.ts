import { Injectable } from '@angular/core';
import { MeetingsStore } from './meetings.store';

@Injectable({ providedIn: 'root' })
export class MeetingsService {

  constructor(protected store: MeetingsStore) {
  }

}
