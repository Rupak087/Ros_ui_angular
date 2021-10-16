import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-document-action-cell',
  template:`<div class="">
  <i
    class="fa fa-pencil-alt action-icon"
    (click)="editEmployee()"
    style="cursor: pointer"
  ></i>
</div>`
})
export class DocumentActionCellComponent implements OnInit {

  constructor() { }

  data;
  params;


  ngOnInit(): void {
  }

  agInit(params){
    this.params = params;
    this.data = params.data;
    
  }
  editEmployee(){
    this.params.context.componentParent.editEmployee(this.data.id);
    
  }
}
