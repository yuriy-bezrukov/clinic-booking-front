import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { MeetingsStore, MeetingsState } from './meetings.store';

@Injectable({ providedIn: 'root' })
export class MeetingsQuery extends QueryEntity<MeetingsState> {

  constructor(protected store: MeetingsStore) {
    super(store);
  }

}
