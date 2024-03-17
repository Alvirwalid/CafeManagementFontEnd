import { NgModule } from '@angular/core';
import {AccordionDirective} from "../accordion.directive";
import {AccordionanchorDirective} from "../accordionanchor.directive";
import {AccordionlinkDirective} from "../accordionlink.directive";




@NgModule({
  declarations: [
    AccordionDirective,
    AccordionanchorDirective,
    AccordionlinkDirective
  ],
  exports:[
    AccordionDirective,
    AccordionanchorDirective,
    AccordionlinkDirective
  ]

})
export class ShareModule { }
