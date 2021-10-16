import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-shift-actioncell',
   template:`<div class="">
   <i
     class="fa fa-eye action-icon"
     aria-hidden="true"
     style="cursor: pointer"
   ></i>
   <i class="fa fa-download ml-2" aria-hidden="true" (click)="download()" style="cursor: pointer"></i>
   <i
     class="fa fa-trash action-icon"
     aria-hidden="true"
     style="cursor: pointer"
   ></i>
 </div>`
})
export class ShiftActioncellComponent implements OnInit {

  constructor() { }

  data;
  params;
 

  ngOnInit(): void {
  }

  agInit(params){
    this.params = params;
    this.data = params.data;
    
  }
 
  download(){
    this.params.context.componentParent.download(this.data.id);
  }

}
