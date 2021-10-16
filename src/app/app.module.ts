/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from "@angular/platform-browser";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';

import { AppRoutingModule } from "./app-routing.module";
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from "@nebular/theme";
import { FormsModule } from "@angular/forms";
import { NgbModalModule } from "@ng-bootstrap/ng-bootstrap";
import { CalendarModule, DateAdapter } from "angular-calendar";
import { adapterFactory } from "angular-calendar/date-adapters/date-fns";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatExpansionModule } from "@angular/material/expansion";
import { NgxPermissionsModule } from "ngx-permissions";
import {AuthInterceptor} from "../app/pas/auth/auth.interceptor";
import { ErrorInterceptor } from './pas/auth/error.interceptor';
import { LoggerModule, NGXLogger, NgxLoggerLevel } from 'ngx-logger';
import { environment } from "../environments/environment";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {
  MsalAngularConfiguration,
  MsalInterceptor,
  MsalModule,
  MsalService,
  MSAL_CONFIG,
  MSAL_CONFIG_ANGULAR
   
} from "@azure/msal-angular";

import { Configuration } from "msal";

import { msalAngularConfig, msalConfig } from "./app-config";

function MSALConfigFactory(): Configuration {

  return msalConfig;

}

function MSALAngularConfigFactory(): MsalAngularConfiguration {

  return msalAngularConfig;

}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    MatInputModule,
    MatFormFieldModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatSnackBarModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: "AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY",
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    NgbModalModule,
    FormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    NgxPermissionsModule.forRoot(),
    // LoggerModule.forRoot({
    //   level: !environment.production ? NgxLoggerLevel.LOG : NgxLoggerLevel.OFF,
    //   // serverLogLevel
    //   serverLogLevel: NgxLoggerLevel.OFF
    //   })
    LoggerModule.forRoot({
      serverLoggingUrl: `${environment.mockapiBaseurl}`,
      level:environment.logLevel,
      serverLogLevel: environment.serverLogLevel,
      disableConsoleLogging: false
    }),
    MsalModule
  ],
  
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
      },
      {
      provide: MSAL_CONFIG,
      useFactory: MSALConfigFactory,
      },
      {
      provide: MSAL_CONFIG_ANGULAR,
      useFactory: MSALAngularConfigFactory,
      },
      MsalService,

    
],
  bootstrap: [AppComponent],
})

export class AppModule {}

