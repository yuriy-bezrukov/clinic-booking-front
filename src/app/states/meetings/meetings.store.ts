import { Injectable } from '@angular/core';
import { Meeting } from './meeting.model';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

export interface MeetingsState extends EntityState<Meeting> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'meetings', idKey: '_id' })
export class MeetingsStore extends EntityStore<MeetingsState> {

  constructor() {
    super();
  }

}

