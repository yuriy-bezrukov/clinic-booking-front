import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AutorizationService } from '@shared/services/autorization.service';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { catchError, finalize, takeUntil } from 'rxjs/operators';
import {
  MatSnackBar,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {

  preloader$ = new BehaviorSubject(false);
  onDestroy$ = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private autorizationService: AutorizationService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }

    const data: { email: string, password: string } = this.loginForm.value;
    this.preloader$.next(true);

    this.autorizationService.signIn(data.email, data.password).pipe(
      takeUntil(this.onDestroy$),
      catchError(() => {
        this.onError();
        return of(false);
      }),
      finalize(() => {
      this.preloader$.next(false);
    })
    ).subscribe();
  }

  onError() {
    this._snackBar.open('Error login or password', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
    this.loginForm.reset();
  }

}
