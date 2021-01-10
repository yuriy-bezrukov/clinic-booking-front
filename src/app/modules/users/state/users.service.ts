import { Injectable } from '@angular/core';
import { UsersStore } from './users.store';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { User } from '@shared/models/User';
import { catchError, tap } from 'rxjs/operators';
import { SnackbarService } from '@shared/services/snackbar.service';
import { of, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsersService {

  constructor(
    protected store: UsersStore,
    private http: HttpClient,
    private snackbarService: SnackbarService
  ) { }

  get() {
    return this.http.get<User[]>(environment.api + 'users').pipe(tap(users => {
      this.store.set(users);
    }));
  }

  create(user: User) {
    return this.http.post<User>(`${environment.api}users`, user).pipe(
      catchError(err => {
        this.snackbarService.error('ERROR user create');
        return throwError(err);
      }),
      tap(user => {
        this.store.add(user);
        this.snackbarService.open('Success user create');
      })
    );
  }

  update(user: User) {
    return this.http.put<User>(`${environment.api}users/${user._id}`, user).pipe(
      catchError(err => {
        this.snackbarService.error('ERROR user update');
        return throwError(err);
      }),
      tap(user => {
        this.store.update(user);
        this.snackbarService.open('Success user update');
      })
    );
  }

  remove(_id: string) {
    return this.http.delete<User>(`${environment.api}users/${_id}`).pipe(
      catchError(err => {
        this.snackbarService.error('ERROR user remove');
        return throwError(err);
      }),
      tap(() => {
        this.store.remove(_id);
        this.snackbarService.open('Success user remove');
      })
    );
  }


}
