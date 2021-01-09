import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreloaderService {

  status = new BehaviorSubject(false);

  on() {
    this.status.next(true);
  }

  off() {
    this.status.next(false);
  }

}
