import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { User } from '@shared/models/User';

export interface UsersState extends EntityState<User> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'users', idKey: '_id' })
export class UsersStore extends EntityStore<UsersState> {

  constructor() {
    super();
  }

}

