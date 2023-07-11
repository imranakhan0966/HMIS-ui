import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavbarService {

  isSidebarVisible: boolean=false;

    sidebarVisibilityChange: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  toggleSidebarVisibility(visible:boolean) {

   this.isSidebarVisible=visible;
    this.sidebarVisibilityChange.next(this.isSidebarVisible);
}


}
