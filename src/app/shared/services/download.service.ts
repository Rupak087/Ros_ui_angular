import { Injectable } from '@angular/core';
import * as XLSX from "xlsx";
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';
import { BehaviorSubject } from 'rxjs';   

@Injectable()
export class DownloadService {

  data: any;
  dataBS= new BehaviorSubject<any>('');


  constructor() {
    this.data;
    this.dataBS.next(this.data);
   }

  downloadExcel(val) {
    this.data=val;
    this.dataBS.next(this.data);
    const fileName = 'test.xlsx';
   
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'test');
   
    XLSX.writeFile(wb, fileName);
 }
 
 downloadCSV(val){
   this.data=val;
   this.dataBS.next(this.data);
   new AngularCsv(this.data, "my Report")
 }

}
