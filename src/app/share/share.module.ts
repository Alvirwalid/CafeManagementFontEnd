import { NgModule } from '@angular/core';
import {AccordionDirective} from "./accordion.directive";
import {AccordionanchorDirective} from "./accordionanchor.directive";
import {AccordionlinkDirective} from "./accordionlink.directive";
import {MenuItems} from "./menu_item";




@NgModule({
  declarations: [
    AccordionDirective,
    AccordionanchorDirective,
    AccordionlinkDirective
  ],
  exports:[
    AccordionDirective,
    AccordionanchorDirective,
    AccordionlinkDirective,

  ],
  providers:[
    MenuItems
  ]

})
export class ShareModule { }
