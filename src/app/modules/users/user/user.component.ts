import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { User } from '@shared/models/User';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UsersQuery } from '../state/users.query';
import { UsersService } from '../state/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input() user: User;

  userForm: FormGroup;
  hasChanges$ = new BehaviorSubject(false);
  onDestroy$ = new Subject();
  preloader$ = new BehaviorSubject(false);

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private usersQuery: UsersQuery,
  ) { }

  ngOnInit(): void {
    this.createForm();
    if (!this.user) {
      this.hasChanges$.next(true);
      return;
    }
    this.userForm.controls.email.setValue(this.user.email);
    this.userForm.controls.password.setValue(this.user.password);
    this.userForm.controls.role.setValue(this.user.role);
    this.userForm.controls.username.setValue(this.user.username);

    this.userForm.valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe(() => {
      this.setChangeStatus();
    });
  }

  createForm() {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]],
      username: ['', [Validators.required]],
    });
    if (!this.user) {
      this.userForm.controls.email.setValidators([this.uniqEmail(), Validators.required, Validators.email]);
    }
  }

  save() {
    this.preloader$.next(true);
    if (this.user) {
      this.usersService.update({ ...this.user, ...this.userForm.value }).pipe(takeUntil(this.onDestroy$)).subscribe(() => {
        this.preloader$.next(false);
      });
    } else {
      this.usersService.create({ ...this.userForm.value }).pipe(takeUntil(this.onDestroy$)).subscribe(() => {
        this.preloader$.next(false);
        this.userForm.reset();
      });
    }
  }

  remove() {
    this.preloader$.next(true);
    this.usersService.remove(this.user._id).pipe(takeUntil(this.onDestroy$)).subscribe(() => {
      this.preloader$.next(false);
    });
  }

  setChangeStatus() {
    const hasChange = Object.keys(this.userForm.value).some(key => this.user[key] !== this.userForm.value[key]);
    this.hasChanges$.next(hasChange);
  }

  uniqEmail(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const emailList = this.usersQuery.getAll().map(user => user.email.toLowerCase());
      const notUniq = emailList.includes(control.value?.toLowerCase());
      return notUniq ? { notUniq: { value: control.value } } : null;
    };
  }

}
