import { NgxLoggerLevel } from "ngx-logger";

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
export const environment = {
  production: true,
  mockapiBaseurl: "https://hrservice.test.restaurantonesolution.com/",
  logLevel: NgxLoggerLevel.WARN,
  serverLogLevel: NgxLoggerLevel.OFF,
  backendUrl: "https://hrservice.test.restaurantonesolution.com/hr/",
  azure_redirect_uri: "https://app-hr.test.restaurantonesolution.com/ROS/emp-management/employees/all-employee",
  azure_logout_uri: "https://app-hr.test.restaurantonesolution.com/ROS/login",
};

