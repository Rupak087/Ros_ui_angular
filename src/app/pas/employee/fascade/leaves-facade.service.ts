import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { leave } from "../model/leaves.model";
import { LeavesService } from "../services/leaves.service";


@Injectable({
    providedIn: 'root'
  })

export class leavesFacadeService{
 private leavesSubject = new BehaviorSubject<any>([]);
  leavesList$ = this.leavesSubject.asObservable();

  // private leavesdelSubject = new BehaviorSubject<any>([]);
  // leavesdelList$ = this.leavesdelSubject.asObservable();

  // private leaveseditSubject = new BehaviorSubject<any>([]);
  // leaveseditList$ = this.leaveseditSubject.asObservable();

  constructor(private LeavesService: LeavesService) { }

private datastore={leavesdata:[]}




 


 getLeaves(){
    this.LeavesService
    .getAllLeaves( )
    .pipe()
    .subscribe(
     (recList) => {
       if (recList.hasOwnProperty("error")) {
         console.log("can't get rec");
         this.datastore.leavesdata = [];
       } else {
         console.log("rec data loaded");
         this.datastore.leavesdata = recList;
       }
       console.log(recList,"Leaves")
       console.log(this.datastore.leavesdata,"Leave")
       return this.leavesSubject.next(
         Object.assign({}, this.datastore).leavesdata
       );
     },
     (err) => {
     console.log("error");
     }
    )
  }
    
  


  deleteleaves(id) {
    this.LeavesService
      .deleteLeavesById(id)
      .pipe()
      .subscribe( 
        (e) => {
          this.datastore.leavesdata.forEach((e, i) => {
            if (e.id === id) {
              this.datastore.leavesdata.splice(i, 1);
            }
          });
          this.leavesSubject.next(
            Object.assign({}, this.datastore).leavesdata
          );
          console.log("leave is deleted");
        },
        (err) => console.log("leaves not found or Cannot delete leave")
      );
  }


  editleaves(e: any ,id ) {
    this.LeavesService
      .editLeavesById(e,id)
      .pipe()
      .subscribe(
        (e) => {
          console.log("leaves", e);
          this.leavesSubject.next(e);
        },
        (err) => console.log(err+"  updated(edit)")
        
      );
  }


}
