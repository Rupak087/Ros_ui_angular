import { NgModule } from "@angular/core";
import { PASRoutingModule } from "./pas-routing.module";
import { PASComponent } from "./pas.component";
import { ThemeModule } from "../@theme/theme.module";
import { DashboradComponent } from "./dashborad/dashborad.component";
import { MiscellaneousModule } from "./miscellaneous/miscellaneous.module";
import { EmployeeModule } from "./employee/employee.module";

import { NbMenuModule } from "@nebular/theme";

import { SharedModule } from "../shared/shared.module";
import { AuthModule } from "./auth/auth.module";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [PASComponent, DashboradComponent],
  imports: [
    PASRoutingModule,

    ThemeModule,
    // NbMenuModule,
    // CashManagementModule,
    // EmployeeModule,
    // StockModule,
    AuthModule,
    MiscellaneousModule,
    SharedModule,
    MatSelectModule,
    MatTableModule,

    NbMenuModule,
    
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCardModule,
  ],
})
export class PASModule {}
