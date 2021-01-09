import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthorizationGuard } from '@shared/guards/authorization.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { NG_ENTITY_SERVICE_CONFIG } from '@datorama/akita-ng-entity-service';
import { NgModule } from '@angular/core';
import { CoreProvidedInterceptors } from '@shared/interceptors';
import { MenuModule } from '@shared-modules/menu/menu.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    AkitaNgRouterStoreModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
    MenuModule
  ],
  providers: [
    { provide: NG_ENTITY_SERVICE_CONFIG, useValue: { baseUrl: 'https://jsonplaceholder.typicode.com' } },
    CoreProvidedInterceptors,
    AuthorizationGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
