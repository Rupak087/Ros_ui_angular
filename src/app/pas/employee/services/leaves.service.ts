import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { leave } from '../model/leaves.model';

@Injectable({
  providedIn: 'root'
})
export class LeavesService {

  constructor( private http : HttpClient) { }

  getAllLeaves(){ //id and status
    const url=`${environment.backendUrl}`+"leave";
    return this.http.get<any>(url);
  }

  editLeavesById(startdate:any,id){ 
    const url = `${environment.backendUrl}leave/${id}`;
    return this.http.put<any>(url,startdate);
  }

  deleteLeavesById(id){
    const url = `${environment.backendUrl}leave/${id}`;
    return this.http.delete<any>(url);
  }



//  editAllLeaves( id,status){
//     const empUrl = `${environment.mockapiBaseurl}shift` ;
//     return this.http.put<any>(url);
//   }
  // updateAllLeaves(){
  //   const url=`${environment.backendUrl}`+"leave";
  //   return this.http.get<any>(url);
  // }

  getVacation(){ 
    const url=`${environment.backendUrl}`+"leave/status";
    return this.http.get<any>(url);
  }
}
