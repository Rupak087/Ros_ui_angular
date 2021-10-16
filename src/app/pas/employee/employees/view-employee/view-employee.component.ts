import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NbDialogService } from "@nebular/theme";
import { Subject } from "rxjs";
import { take } from "rxjs/operators";
import { EmployeeFacadeService } from "../../fascade/employee-facade.service";
import { ShiftCalendarFacadeService } from "../../fascade/shift-calendar-facade.service";
import { ViewDocumentActionCellComponent } from "./document-action-cell/view-document-action-cell.component";
import { ViewShiftActionCellComponent } from "./shift-action-cell/view-shift-action-cell.component";

@Component({
  selector: "ngx-view-employee",
  templateUrl: "./view-employee.component.html",
  styleUrls: ["./view-employee.component.scss"],
})
export class ViewEmployeeComponent implements OnInit {
  private readonly destroy$ = new Subject<void>();
  employee$ = this.employeeFacade.employee$;

  empFormTab = "Basic";

  gridApi: any;
  gridColumnApi: any;
  empid;
  empobj;
  deleteCashupObj: any;

  shiftCalendarList$ = this.shiftCalendarFacadeService.shiftCalendarList$;
  allShiftCalendar: any =[];
  constructor(
    private router: Router,
    private employeeFacade: EmployeeFacadeService,
    private route: ActivatedRoute,
    private dialogService: NbDialogService,
    private shiftCalendarFacadeService: ShiftCalendarFacadeService,
  ) {}

  allEmployee: any;
  ngOnInit(): void {
    this.shiftCalendarFacadeService.load();
    this.shiftCalendarList$.subscribe((data) => {
      this.allShiftCalendar = data;
      console.log("New data is recieved",this.allShiftCalendar);
    });
    this.empid = this.route.snapshot.paramMap.get("id");
    this.employeeFacade.searchEmployee(this.empid);
    this.employee$.pipe().subscribe((data) => {
      this.allEmployee = Object.assign([], data);
      this.empobj = this.allEmployee.find((e) => e.empId === this.empid);
      console.log("all employee list",this.allEmployee);
      console.log("empobj",this.empobj)
    });
    
  }

  setFormTab(s: string) {
    this.empFormTab = s;
  }

  //Delete Popup
  @ViewChild("deleteContent") deleteContent: TemplateRef<any>;
  DeleteEmpDetail() {
    this.deleteCashupObj = this.empid;
    this.dialogService.open(this.deleteContent);
  }
  deleteEmployeeData(d) {
    this.router.navigateByUrl("/ROS/emp-management/employees/all-employee");
    console.log(this.empobj, " Has been deleted");
    this.employeeFacade.deleteEmployee(this.empobj.id);
  }

  //Navigate to home page
  back() {
    this.router.navigateByUrl("/ROS/emp-management/employees/all-employee");
  }

  goToEdit() {
    this.router.navigateByUrl(
      "/ROS/emp-management/employees/edit-employee/" + this.empid
    );
  }

  gridOptions = {
    context: {
      componentParent: this,
    },
  };

  defaultColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
  };

  columnDefs = [
    {
      field: "date",
      headerName: "DATE",
      sortable: true,
      filter: true,
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true,
    },
    { field: "location", headerName: "LOCATION", sortable: true, filter: true },
    {
      field: "startTime",
      headerName: "START TIME",
      sortable: true,
      filter: true,
    },
    {
      field: "endTime",
      headerName: "END TIME",
      sortable: true,
      filter: true,
    },
    {
      field: "break",
      headerName: "BREAK",
      sortable: true,
      filter: true,
    },
    {
      field: "approved",
      headerName: "APPROVED",
      sortable: true,
      filter: true,
    },
    {
      field: "ACTIONS",
      cellRendererFramework: ViewShiftActionCellComponent,
    },
  ];

 

  //document table
  columnDefs2 = [
    {
      field: "docName",
      headerName: "DOCUMENT NAME",
      sortable: true,
      filter: true,
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true,
    },
    { field: "desp", headerName: "DESCRIPTION", sortable: true, filter: true },
    {
      field: "docType",
      headerName: "DOCUMENT TYPE",
      sortable: true,
      filter: true,
    },
    {
      field: "attachment",
      headerName: "ATTACHMENT",
      sortable: true,
      filter: true,
    },
    {
      field: "ACTIONS",
      cellRendererFramework: ViewDocumentActionCellComponent,
    },
  ];

  DocDetails = [
    {
      docName: "Passport",
      desp: "Passport of employee",
      docType: "contract",
      attachment: "image_123.jpg",
    },
  ];

  rowSelection = "multiple";

  /* 
    On Grid ready
  */
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    //console.log("params:" , params.columnApi);

    // To resize all columns
    var allColumnIds = [];
    this.gridColumnApi.getAllColumns().forEach(function (column) {
      allColumnIds.push(column.colId);
    });
    // this.gridColumnApi.autoSizeColumns(allColumnIds, true);
    // this.gridApi.sizeColumnsToFit();
    // this.gridApi.resetRowHeights();
  }
}
