import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { finalize, take, takeUntil } from 'rxjs/operators';
import { UsersQuery } from '../state/users.query';
import { UsersService } from '../state/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  users$ = this.usersQuery.selectAll();
  preloader$ = new BehaviorSubject(false);
  onDestroy$ = new Subject();

  constructor(
    private usersQuery: UsersQuery,
    private usersService: UsersService,
  ) { }

  ngOnInit(): void {
    this.preloader$.next(true);
    this.usersService.get().pipe(
      takeUntil(this.onDestroy$),
      take(1),
      finalize(() => {
        this.preloader$.next(false);
      })
    ).subscribe();
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

}
