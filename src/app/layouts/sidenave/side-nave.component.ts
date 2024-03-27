import {ChangeDetectorRef, Component, inject, OnDestroy} from '@angular/core';
import {MatchMedia} from "@angular/flex-layout/core/match-media";
import {MediaMatcher} from "@angular/cdk/layout";
import * as console from "console";
import {MenuItems} from "../../share/menu_item";
import {jwtDecode} from "jwt-decode"

@Component({
  selector: 'app-sidenave',
  templateUrl: './side-nave.component.html',
  styleUrl: './side-nave.component.scss'
})
export class SideNaveComponent implements OnDestroy{
  //
  mdq:MediaQueryList;
  mediaQueryListener:()=>void;
  userRole:any;
  token:any=localStorage.getItem('token');
  tokenPayload:any;


  constructor(private changeDetectorRef:ChangeDetectorRef,private  media:MediaMatcher,
              public menuItem:MenuItems) {

     this.tokenPayload = jwtDecode(this.token);
     this.userRole= this.tokenPayload?.['role']

    // console.log(this.tokenPayload);

    this.mdq = media.matchMedia("max-width: 992px");
    this.mediaQueryListener=()=>{

      console.log("Roleeee "+this.userRole)
      changeDetectorRef.detectChanges();
      console.log("Change Side?",this.mdq);

    }

    this.mdq.addListener(this.mediaQueryListener)
  }

  ngOnDestroy(): void {
    // this.mdq.removeListener(this.mediaQueryListener);
  }

  protected readonly menubar = menubar;
}
