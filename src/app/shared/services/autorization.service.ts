import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ROUTINGS } from '../../app-routing.module';
import { User, UserRole } from '@shared/models/User';

const storageToken = 'storageToken';

@Injectable({
  providedIn: 'root'
})
export class AutorizationService {

  user: User;
  get token() {
    return sessionStorage.getItem(storageToken);
  }

  set token(str: string) {
    sessionStorage.setItem(storageToken, str);
  }

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  isUser() {
    return this.user.role === UserRole.admin || this.user.role === UserRole.user;
  }

  hasAccessToPanel() {
    return this.getCurrentUser().pipe(map(user => {
      return user && (user.role === UserRole.admin || user.role === UserRole.user);
    }));
  }

  signIn(email: string, password: string) {
    return this.http.post<{ access_token: string }>(environment.api + 'auth/login', { email, password }).pipe(mergeMap(res => {
      if (res.access_token) {
        this.token = res.access_token;
        return this.getCurrentUser().pipe(tap(user => {
          if (user && user.role && user.role !== UserRole.unresolve) {
            this.router.navigateByUrl(ROUTINGS.main);
          }
        }));
      }
    }));
  }

  navigationWithoutAccess() {
    this.router.navigateByUrl(ROUTINGS.authorization);
  }

  signUp(name: string, email: string, password: string, role: 'client') {
    return this.http.post<{ status: 'error' | 'success', message: string, userId: string }>(environment.api + 'signup', { name, email, password, role })
      .pipe(catchError(res => {
        return of(res);
      }));
  }

  signOut() {
    sessionStorage.clear();
    localStorage.clear();
    location.replace('/');
  }

  private getCurrentUser() {
    if (this.user) {
      return of(this.user);
    }
    return this.http.get<User | null>(environment.api + 'profile/').pipe(
      catchError(() => {
        return of(null);
      }),
      tap(res => {
        if (res?.email) {
          this.user = res;
          return;
        }
      }));
  }
}
