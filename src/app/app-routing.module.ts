import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizationGuard } from '@shared/guards/authorization.guard';

export const ROUTINGS = {
  authorization: 'authorization',
  main: 'main',
  users: 'users',
  calendar: 'calendar'
};

const routes: Routes = [
  { path: ROUTINGS.authorization, loadChildren: () => import('./modules/authorization/authorization.module').then(m => m.AuthorizationModule) },
  {
    path: ROUTINGS.main,
    canActivate: [AuthorizationGuard],
    loadChildren: () => import('./modules/panel/panel.module').then(m => m.PanelModule),
  },
  {
    path: ROUTINGS.calendar,
    canActivate: [AuthorizationGuard],
    loadChildren: () => import('./modules/calendar/calendar.module').then(m => m.CalendarModule),
  },
  {
    path: ROUTINGS.users,
    canActivate: [AuthorizationGuard],
    loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule),
  },
  { path: '**', redirectTo: ROUTINGS.main }
];


@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    // { enableTracing: true } // <-- debugging purposes only
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
