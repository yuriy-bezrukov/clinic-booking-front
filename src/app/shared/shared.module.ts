import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutorizationService } from './services/autorization.service';
import { PreloaderModule } from '@shared-modules/preloader/preloader.module';
import { PreloaderComponent } from '@shared-modules/preloader/preloader.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PreloaderModule
  ],
  providers: [
    AutorizationService,
  ],
  exports:[PreloaderComponent]
})
export class SharedModule { }
