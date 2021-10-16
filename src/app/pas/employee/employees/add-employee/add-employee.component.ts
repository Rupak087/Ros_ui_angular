import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NbDialogService } from "@nebular/theme";
import { EmployeeFacadeService } from "../../fascade/employee-facade.service";
import { DocumentActionCellComponent } from "./document-action-cell/document-action-cell.component";
import { employeeDocument } from '../../model/employeeDocument.model';
import { DownloadService } from "../../../../shared/services/download.service";
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { UploadFileService } from '../../services/upload-file.service';

@Component({
  selector: "ngx-add-employee",
  templateUrl: "./add-employee.component.html",
  styleUrls: ["./add-employee.component.scss"],
})
export class AddEmployeeComponent implements OnInit {
  employeeList$ = this.employeeFacade.empshiftCalendarSubject$;

  allDocuments: employeeDocument[];
  deleteCashupObj;

  url="";

  empFormTab = "Basic";
  empFormGroup: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl("Yes");
  floatLabelControl2 = new FormControl("Statement1");
  floatLabelControl3 = new FormControl("Yes");
  gridApi: any;
  gridColumnApi: any;
  StartDate = new Date();
  empLastId;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private employeeFacade: EmployeeFacadeService,
    private route: ActivatedRoute,
    private dialogService: NbDialogService,
    private downloadService: DownloadService,
    private uploadService: UploadFileService
  ) {}

  allEmployee: any;
  ngOnInit(): void {
    this.employeeFacade.getEmpShiftCalendar();
    this.employeeList$.pipe().subscribe((Data) => {
      this.allEmployee = Data;
      this.empLastId = this.allEmployee.length;
    });
    this.empFormGroup = this.fb.group({
      joiningInfo: ["", [Validators.required]],
      profileimg: ["", []],
      firstname: ["", [Validators.required]],
      middlename: [""],
      lastname: ["", [Validators.required]],
      city: ["", [Validators.required]],
      state: ["", [Validators.required]],
      country: ["", [Validators.required]],
      address: ["", [Validators.required]],
      zip: ["", []],
      email: ["", [Validators.email]],
      mobilenumber: [
        "",
        [Validators.required, Validators.pattern("[6-9]\\d{9}")],
      ],
      telephone: ["", [Validators.required]],
      department: ["", [Validators.required]],
      position: ["", [Validators.required]],
      location: ["", [Validators.required]],
      kinfirstname: ["", [Validators.required]],
      kinmiddlename: ["", []],
      kinlastname: ["", [Validators.required]],
      kinaddress: ["", [Validators.required]],
      kinzip: ["", [Validators.required]],
      kinemail: ["", [Validators.email]],
      kinmobilenumber: [
        "",
        [Validators.required, Validators.pattern("[6-9]\\d{9}")],
      ],
      kintelephone: ["", [Validators.required]],
      kinrelation: ["", [Validators.required]],
      bankname: ["", [Validators.required]],
      branchacc: ["", [Validators.required]],
      accholdername: ["", [Validators.required]],
      sortcode: ["", [Validators.required]],
      accnumber: ["", [Validators.required]],
      emptype: ["", [Validators.required]],
      salary: ["", [Validators.required]],
      docname: ["", [Validators.required]],
      doctype: ["", [Validators.required]],
      Desp: ["", []],
      taxP45: this.hideRequiredControl,
      havingNInumber: this.floatLabelControl,
      NInumber: ["", [Validators.required]],
      passportnumber: ["", [Validators.required]],
      maritalstatus: ["", []],
      age: ["", [Validators.required]],
      gender: ["", [Validators.required]],
      DOB: ["", [Validators.required]],
      birthplace: ["", []],
      nationality: ["", [Validators.required]],
      medicalcondition: [""],
      loan: this.floatLabelControl2,
      empstatement: this.floatLabelControl3,
      docAttach: [""],
    });
  }
  dateFormatter(d: Date) {
    return d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();
  }
  setFormTab(s: string) {
    this.empFormTab = s;
  }

  @ViewChild("OpenPopup") OpenPopup: TemplateRef<any>;
  savePopup() {
    this.dialogService.open(this.OpenPopup);
  }

  viewEmployee() {
    //this.router.navigateByUrl("/ROS/employees/view-employee/" + this.empLastId);
    this.router.navigateByUrl("/ROS/emp-management/employees/all-employee");
  }

  submitEmpForm(form) {
    if (form.status == "INVALID") {
      console.log("Invalid Form ", form);
    }
    console.log(form.value);
    let newEmp = {
          joiningDate: form.value.joiningInfo,
          firstName: form.value.firstname,
          middleName: form.value.middleName,
          lastName: form.value.lastname,
          email: form.value.email,
          mobileNum: form.value.mobilenumber,
          telephone: form.value.telephone,
          profilePic: form.value.profileimg,
          address: {
            street: form.value.address,
            zipCode: form.value.zip,
            state: form.value.state,
            city: form.value.city,
            country: form.value.country,
          },

        departmentDetails: {
          position: form.value.position,
          department: {
            name: form.value.department,
          }
        },

        locationDetails: {
          location: form.value.location,
        },
        employeeKin: {
          firstName: form.value.kinfirstname,
          middleName: form.value.kinmiddlename,
          lastName: form.value.kinlastname,
          email: form.value.kinemail,
          telephone: form.value.kintelephone,
          relation: form.value.kinrelation,
          //address: {
            street: form.value.kinaddress,
            zipCode: form.value.kinzip,
            state: form.value.state,
            city: form.value.city,
            country: form.value.country,
          //}
        },
      
        employeeBankInfo: [
          {
            bankName: form.value.bankname,
            bankAccount: form.value.branchacc,
            holderName: form.value.accholdername,
            sortCode: form.value.BranchSortCode,
            accNo: form.value.accnumber,
            // salaryInfo: {
              salary: form.value.salary,
              employeeType: form.value.emptype,
            //}
          }
        ],
      
      documents: [
          {
            document: form.value.docname,
            description: form.value.Desp,
            documentType: form.value.doctype,
          }],
      StatutoryInfo: {
        BankInfo: {
          nationality: form.value.nationality,
          PlaceofBirth: form.value.birthplace,
          dateOfBirth: form.value.DOB,
          gender: form.value.gender,
          age: form.value.age,
          matritalStatus: form.value.maritalstatus,
          passportNum: form.value.passportnumber,
        },
        NInumber: {
          HavingNInumber: form.value.havingNInumber,
          niNum: form.value.NInumber,
        },
        Tax: {
          p45Tax: form.value.taxP45,
        },
      },
      StatmentsInfo: {
        employeeStatement: {
          employeeStatement: form.value.empstatement,
        },
        studentLoan: {
          studentLoan: form.value.loan,
        },
        medicalCondition: {
          medicalCondition: form.value.medicalcondition,
        },
      },
    };
    console.log(newEmp);
    this.employeeFacade.addEmployee(newEmp);
  }

  back() {
    this.router.navigateByUrl("/ROS/emp-management/employees/all-employee");
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

  /*   columnDefs = [
    {
      field: "Shift_date",
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
      cellRendererFramework:ShiftActioncellComponent,
    },
  ];
  
  ShiftDetails = [
    { Shift_date: '01 March 2021', location: 'Cremes Cafe', startTime: "09:00", endTime: "15:00", break: "00:45", approved:"Not approved" },
    { Shift_date: '01 March 2021', location: 'Cremes Cafe', startTime: "09:00", endTime: "15:00", break: "00:45", approved:"Not approved" },
    { Shift_date: '01 March 2021', location: 'Cremes Cafe', startTime: "09:00", endTime: "15:00", break: "00:45", approved:"Not approved" },
    { Shift_date: '01 March 2021', location: 'Cremes Cafe', startTime: "09:00", endTime: "15:00", break: "00:45", approved:"Not approved" },
]; */

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
      cellRendererFramework: DocumentActionCellComponent,
    },
  ];

  DocDetails = [
    {
      docName: "Passport",
      desp: "Passport of employee",
      docType: "contract",
      attachment: "image_1234.jpg",
    },
  ];

  rowSelection = "multiple";

  /* 
    On Grid ready
  */
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    console.log("params:" + params);

    // To resize all columns
    var allColumnIds = [];
    this.gridColumnApi.getAllColumns().forEach(function (column) {
      allColumnIds.push(column.colId);
    });
    // this.gridColumnApi.autoSizeColumns(allColumnIds, false);
    // this.gridApi.sizeColumnsToFit();
    // this.gridApi.resetRowHeights();
  }

  onAddRow() {
    var docName = (<HTMLInputElement>document.getElementById("documentName"))
      .value;
    var docAttach = (<HTMLInputElement>document.getElementById("file")).value;
    docAttach = docAttach.split("\\").pop();
    var docType = (<HTMLSelectElement>document.getElementById("documentType"))
      .value;
    var docDescription = (<HTMLInputElement>(
      document.getElementById("documentDesp")
    )).value;
    this.gridApi.updateRowData({
      add: [
        {
          docName: docName,
          desp: docDescription,
          docType: "Contract",
          attachment: docAttach,
        },
      ],
    });
  }
  @ViewChild("deleteContent") deleteContent: TemplateRef<any>;
  deleteDocument(row) {
    this.deleteCashupObj = row;
    this.dialogService.open(this.deleteContent);
  }  
 
  deleteDocumentData(d) {
    alert( + " Data Deleted Succesfully!!");
    //this.employeeFacade.deleteDocument(d.id);
  }
  downloadDocument() {
    // this.downloadService.downloadCSV(this.allDocuments);
    // this.downloadService.downloadExcel(this.allDocuments);
    this.downloadFile();
  }

  //File Upload
  title = 'File-Upload-Save';

  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  selectedFile = null;
  changeImage = false;

  downloadFile(){
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', '_File_Saved_Path');
    link.setAttribute('download', 'file_name.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  change($event) {
    this.changeImage = true;
  }

  changedImage(event) {
    this.selectedFile = event.target.files[0];
  }
  
  upload() {
    this.progress.percentage = 0;

    this.currentFileUpload = this.selectedFiles.item(0);
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        alert('File Successfully Uploaded');  
      }
    

    this.selectedFiles = undefined;
      }
    );
  }
  // To preview the profile image
  selectFile(event) {
    if(event.target.files){
      var reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (event: any)=>{
        this.url = event.target.result
      }
    }
  }
}
