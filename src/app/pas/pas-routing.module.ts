import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


import { NotFoundComponent } from "./miscellaneous/not-found/not-found.component";
import { PASComponent } from "./pas.component";

import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { AuthGuard } from "./auth/auth.guard";
import { DashboradComponent } from "./dashborad/dashborad.component";
import { MsalGuard } from "@azure/msal-angular";


const routes: Routes = [
  {
    path: "",

    component: PASComponent,
    children: [
      {
        path: "dashborad",
        canActivate: [MsalGuard],
        component: DashboradComponent,
      },
     
      {
        path: "emp-management",
        canLoad: [],

        loadChildren: () =>
          import("./employee/employee.module").then((m) => m.EmployeeModule),
      },

      { path: "register", component: RegisterComponent },
      { path: "login", component: LoginComponent },
      {
        path: "",
        redirectTo: "login",
        pathMatch: "full",
      },

      

      {
        path: "**",
        component: NotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PASRoutingModule {}
