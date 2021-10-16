import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NotFoundComponent } from "../miscellaneous/not-found/not-found.component";
import { AttendanceComponent } from "./attendance/attendance.component";
import { EmpProfileComponent } from "./emp-profile/emp-profile.component";
import { EmployeeComponent } from "./employee.component";
import { AddEmployeeComponent } from "./employees/add-employee/add-employee.component";
import { AllEmployeeComponent } from "./employees/all-employee/all-employee.component";
import { EditEmployeeComponent } from "./employees/edit-employee/edit-employee.component";
import { EmployeesComponent } from "./employees/employees.component";
import { ViewCalenderComponent } from "./employees/view-calender/view-calender.component";
import { ViewEmployeeComponent } from "./employees/view-employee/view-employee.component";
import { LeavesComponent } from "./leaves/leaves.component";
import { AllPayrollComponent } from "./payroll/all-payroll/all-payroll.component";
import { NewPayrollComponent } from "./payroll/new-payroll/new-payroll.component";
import { PayrollComponent } from "./payroll/payroll.component";
import { RequestComponent } from "./request/request.component";
import { ShiftCalendarLandingComponent } from "./shift-calendar/shift-calendar-landing/shift-calendar-landing.component";
import { ShiftCalendarComponent } from "./shift-calendar/shift-calendar.component";
import { ShiftSchedularComponent } from "./shift-calendar/shift-schedular/shift-schedular.component";
import { MsalGuard } from "@azure/msal-angular";

const routes: Routes = [
  {
    path: "employees",
    component: EmployeesComponent,
    canActivate: [MsalGuard],
    children: [
      {
        path: "",
        redirectTo: "all-employee",
        pathMatch: "full",
      },
      {
        path: "all-employee",
        component: AllEmployeeComponent,
      },
      {
        path: "view-employee/:id",
        component: ViewEmployeeComponent,
      },
      {
        path: "edit-employee/:id",
        component: EditEmployeeComponent,
      },
      {
        path: "add-employee",
        component: AddEmployeeComponent,
      },
      {
        path: "view-calender/:id",
        component: ViewCalenderComponent,
      },
    ],
  },
  {
    path: "shift-calendar",
    canActivate: [MsalGuard],
    component: ShiftCalendarComponent,
    children: [
      {
        path: "",
        redirectTo: "landing",
      },
      {
        path: "landing",
        component: ShiftCalendarLandingComponent,
      },
      {
        path: "shift-schedular",
        component: ShiftSchedularComponent,
      },
    ],
  },
  {
    path: "payroll",
    canActivate: [MsalGuard],
    component: PayrollComponent,
    children: [
      {
        path: "",
        redirectTo: "all-payroll",
      },
      {
        path: "all-payroll",
        component: AllPayrollComponent,
      },
      {
        path: "new-payroll",
        component: NewPayrollComponent,
      },
    ],
  },
  {
    path: "leaves",
    canActivate: [MsalGuard],
    component: LeavesComponent,
  },
  {
    path: "attendance",
    canActivate: [MsalGuard],
    component: AttendanceComponent,
  },
  {
    path: "requests",
    canActivate: [MsalGuard],
    component: RequestComponent,
  },
  {
    path: "profile",
    canActivate: [MsalGuard],
    component: EmpProfileComponent,
  },

  {
    path: "**",
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
