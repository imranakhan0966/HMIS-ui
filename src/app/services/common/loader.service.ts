import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {


  loaderVisibilityChange: Subject<boolean> = new Subject<boolean>();

constructor() {

 }

toggleLoaderVisibility(visible:boolean) {
  this.loaderVisibilityChange.next(visible);
}



}
