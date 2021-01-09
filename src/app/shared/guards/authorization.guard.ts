import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AutorizationService } from '@shared/services/autorization.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {

  constructor(
    private autorizationService: AutorizationService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const hasAccess = this.autorizationService.hasAccessToPanel().pipe(tap(access => {
      if (!access) {
        this.autorizationService.navigationWithoutAccess();
      }
    }
    ));
    return hasAccess;
  }

}
