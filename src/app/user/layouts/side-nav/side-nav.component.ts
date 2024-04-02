import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {MediaMatcher} from "@angular/cdk/layout";
import {MenuItems} from "../../../share/menu_item";
import {jwtDecode} from "jwt-decode";
import console from "console";

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent  implements OnDestroy{
  mdq:MediaQueryList;
  mediaQueryListener:()=>void;
  userRole:any;
  token:any=localStorage.getItem('token');
  tokenPayload:any;
  constructor(private changeDetectorRef:ChangeDetectorRef,private  media:MediaMatcher,
              public menuItem:MenuItems) {

    this.tokenPayload = jwtDecode(this.token);
    this.userRole= this.tokenPayload?.['role']
    this.mdq = media.matchMedia("max-width: 992px");
    this.mediaQueryListener=()=>{
      console.log("Role "+this.userRole)
      changeDetectorRef.detectChanges();
      console.log("Change Side?",this.mdq);

    }

    this.mdq.addListener(this.mediaQueryListener)
  }

  ngOnDestroy(): void {
    // this.mdq.removeListener(this.mediaQueryListener);
  }

}
