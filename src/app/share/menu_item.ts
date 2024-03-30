import {Injectable, signal} from "@angular/core"
export interface Menu{
  state:string;
  name:string;
  type:string;
  icon:string;
  role:string;
}

const MENUITEMS =[
  {state:'dashboard',name:'Dashboard',type:'link',icon:'dashboard',role:''},
  {state:'category',name:'Manage Categories',type:'link',icon:'category',role:'admin'},
  {state:'product',name:'Manage Products',type:'link',icon:'inventory_2',role:''},
]

@Injectable()
export  class MenuItems{

  getMenuItem(){
    return MENUITEMS;
  }
}
