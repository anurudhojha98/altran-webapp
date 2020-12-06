import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

interface LoaderState{
  show:boolean
}

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private $loaderSubject = new Subject<LoaderState>();
  $loaderState = this.$loaderSubject.asObservable();
  constructor() { }
  showLoader() {
    this.$loaderSubject.next(<LoaderState>{ show: true });
  }

  /**
   * function to hide loader
   */
  hideLoader() {
    this.$loaderSubject.next(<LoaderState>{ show: false });
  }
}
