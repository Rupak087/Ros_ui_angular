import { Injectable, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NGXLogger } from "ngx-logger";
import { NgxPermissionsService } from "ngx-permissions";
import { AuthServiceService } from "../service/auth-service.service";
import { BroadcastService, MsalService } from "@azure/msal-angular";
import { Logger, CryptoUtils } from "msal";
import { isIE, b2cPolicies } from "../../../app-config";
import { Subject, Subscription } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthFacadeService {
  loggedIn: Boolean = false;
  user = null;
  token = "";
  restaurants: [];
  selectedRestaurant = {};

  subscriptions: Subscription[] = [];

  isIframe = false;

  private readonly _destroying$ = new Subject<void>();

  ngOnInit() {
    this.setUserPermissions();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private ngxPermissions: NgxPermissionsService,
    private logger: NGXLogger,
    private msalService: MsalService,
    private broadcastService: BroadcastService
  ) {
    this.setUserPermissions();
    // this.login("ros@gmail.com", 12345);
    // this.setUserPermissions();
    //this.setUserPermissions();

    let loginSuccessSubscription: Subscription;
    let loginFailureSubscription: Subscription;

    this.isIframe = window !== window.parent && !window.opener;
    this.checkAccount();

    // event listeners for authentication status
    loginSuccessSubscription = this.broadcastService.subscribe(
      "msal:loginSuccess",
      (success) => {
        this.login("ros@gmail.com", 12345);
        this.logger.log("Success", success);
        // We need to reject id tokens that were not issued with the default sign-in policy.
        // "acr" claim in the token tells us what policy is used (NOTE: for new policies (v2.0), use "tfp" instead of "acr")
        // To learn more about b2c tokens, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/tokens-overview
        if (success.idToken.claims.acr === b2cPolicies.names.resetPassword) {
          window.alert(
            "Password has been reset successfully. \nPlease sign-in with your new password"
          );
          return this.msalService.logout();
        }

        console.log(
          "login succeeded. id token acquired at: " + new Date().toString()
        );
        console.log(success);

        this.checkAccount();
      }
    );

    loginFailureSubscription = this.broadcastService.subscribe(
      "msal:loginFailure",
      (error) => {
        console.log("login failed");
        console.log(error);

        if (error.errorMessage) {
          // Check for forgot password error
          // Learn more about AAD error codes at https://docs.microsoft.com/en-us/azure/active-directory/develop/reference-aadsts-error-codes
          if (error.errorMessage.indexOf("AADB2C90118") > -1) {
            if (isIE) {
              this.msalService.loginRedirect(
                b2cPolicies.authorities.resetPassword
              );
            } else {
              this.msalService.loginPopup(
                b2cPolicies.authorities.resetPassword
              );
            }
          }
        }
      }
    );

    // redirect callback for redirect flow (IE)
    this.msalService.handleRedirectCallback((authError, response) => {
      if (authError) {
        //this.login("ros@gmail.com", 12345);
        console.error("Redirect Error: ", authError.errorMessage);
        return;
      }

      console.log("Redirect Success: ", response);
    });

    this.msalService.setLogger(
      new Logger(
        (logLevel, message, piiEnabled) => {
          console.log("MSAL Logging: ", message);
        },
        {
          correlationId: CryptoUtils.createNewGuid(),
          piiLoggingEnabled: false,
        }
      )
    );

    this.subscriptions.push(loginSuccessSubscription);
    this.subscriptions.push(loginFailureSubscription);
  }

  checkAccount() {
      this.loggedIn = !!this.msalService.getAccount();
    }

  loginToAzure(){
      this.login("ros@gmail.com", "12345");
      try {
        if (isIE) {
          this.msalService.loginRedirect();
        } else {
          this.msalService.loginRedirect();
        }
      } catch (error) {
        this.logger.error("There's an error during authentication", error);
      }
  }

  login(email, password) {
    let data = { email: email, pass: password };
    let res = this.authService.login(data);

    if (res.authenticated) {
      this.loggedIn = true;
      this.setAuthToken(res.token);

      this.user = {
        email: "ros@gmail.com",
        token: res.token,
        username: "Ashvita",
        role: "ADMIN",
        restaurants: [
          {
            name: "Creams Cafe",
            location: "London",
            isPrimary: true,
            permissions: [
              "READ_CASHUP",
              "DOWNLOAD_CASHUP",
              "ALL",
              "EDIT_BANKING",
              "DELETE_BANKING",
              "VIEW_BANKING",
              "ALL_ACTION_IN_BANKING",
              "EDIT_PUBLISHED_CASHUP",
            ],
            configurations: {
              currency: "GBQ",
              currency_sym: "£",
              company_code: "CR_CA",
              complaints: [
                { value: "COMPLAINT1", code: "C1" },
                { value: "COMPLAINT2", code: "C2" },
                { value: "COMPLAINT3", code: "C3" },
              ],
              reasons: [
                { value: "REASON1", code: "R1" },
                { value: "REASON2", code: "R2" },
                { value: "REASON3", code: "R3" },
              ],
              kpi_covers: [
                { id: 1, field_name: "Table Covers", code: "TBC" },
                { id: 2, field_name: "Third Party", code: "TPT" },
                { id: 3, field_name: "Take Away Covers", code: "TAC" },
                { id: 4, field_name: "Void", code: "VOD" },
              ],

              third_party: [
                { id: 1, field_name: "Just Eat", code: "JEA" },
                { id: 3, field_name: "Deliveroo", code: "DLV" },
                { id: 3, field_name: "Zomato", code: "ZMT" },
                { id: 3, field_name: "Uber Eats", code: "UBR" },
              ],
              tills: [
                { id: 1, till_name: "Till 1", code: "TL1" },
                { id: 2, till_name: "Till 2", code: "TL2" },
                { id: 3, till_name: "Till 3", code: "TL3" },
              ],

              petty_cash: [
                { id: 3, field_name: "Food & Drinks", code: "FND" },
                { id: 3, field_name: "Sundries", code: "SND" },
                { id: 3, field_name: "Maintenance", code: "MNT" },
              ],
              Res_Employees_conf: [
                { empid: 1, empname: "Charan" },
                { empid: 2, empname: "Bhargavi" },
              ],
              pdqs: [
                { id: 1, field_name: "Vouchers", code: "VCR" },
                { id: 1, field_name: "iZettle", code: "ZTL" },
              ],
              pdq_card: [
                { id: 1, field_name: "Visa", code: "VSA" },
                { id: 2, field_name: "Amex", code: "AMX" },
                { id: 3, field_name: "Master Card", code: "MSC" },
              ],
              shift_types: [
                {
                  id: 1,
                  shift_name: "Furlough",
                  description: "Starts at 2",
                  allow_booking: true,
                  count_hrs_in_payroll: true,
                  include_schedule: false,
                },
              ],
              departments: [
                {
                  id: 1,
                  dept_name: "Management",
                  description: "Management Level",
                },
                { id: 2, dept_name: "FOH", description: "Front Of House " },
                { id: 3, dept_name: "BOH", description: "Back of House " },
              ],
            },
          },
          {
            name: "ABT Cafeteria",
            location: "India",
            isPrimary: false,
            permissions: ["READ_CASHUP"],
            configurations: {
              currency: "USD",
              currency_sym: "$",
              company_code:"ABT_CS",
              complaints: [
                { value: "COMPLAINT1", code: "C1" },
                { value: "COMPLAINT2", code: "C2" },
                { value: "COMPLAINT3", code: "C3" },
              ],
              reasons: [
                { value: "REASON1", code: "R1" },
                { value: "REASON2", code: "R2" },
                { value: "REASON3", code: "R3" },
              ],
              kpi_covers: [
                { id: 1, field_name: "Table Covers", code: "TBC" },
                { id: 2, field_name: "Third Party", code: "TPT" },
                { id: 3, field_name: "Take Away Covers", code: "TAC" },
                { id: 4, field_name: "Void", code: "VOD" },
              ],
              third_party: [
                { id: 1, field_name: "Just Eat", code: "JEA" },
                { id: 3, field_name: "Deliveroo", code: "DLV" },
                { id: 3, field_name: "Zomato", code: "ZMT" },
              ],
              tills: [
                { id: 1, till_name: "Till 1", code: "TL1" },
                { id: 2, till_name: "Till 2", code: "TL2" },
              ],

              petty_cash: [
                { id: 3, field_name: "Food & Drinks", code: "FND" },
                { id: 3, field_name: "Sundries", code: "SND" },
                { id: 3, field_name: "Maintenance", code: "MNT" },
                { id: 3, field_name: "Repairs", code: "RPR" },
              ],
              Res_Employees_conf: [
                { empid: 1, empname: "Charan" },
                { empid: 2, empname: "Bhargavi" },
              ],
              pdqs: [
                { id: 1, field_name: "Vouchers", code: "VCR" },
                { id: 1, field_name: "iZettle", code: "ZTL" },
              ],
              shift_types: [
                {
                  id: 1,
                  shift_name: "Furlough",
                  description: "Starts at 2",
                  allow_booking: true,
                  count_hrs_in_payroll: true,
                  include_schedule: false,
                },
              ],
              departments: [
                {
                  id: 1,
                  dept_name: "Management",
                  description: "Management Level",
                },
                { id: 2, dept_name: "FOH", description: "Front Of House " },
                { id: 3, dept_name: "BOH", description: "Back of House " },
              ],
            },
          },
        ],
      };

      localStorage.setItem("ROSuser", JSON.stringify(this.user));
      this.setRestaurants(this.user);
      this.setUserPermissions();

      this.logger.log("User Logged Successfully", this.user);
      this.logger.log("Selected Restaurant", this.selectedRestaurant);

      if (this.user == null || this.restaurants == null) {
        this.router.navigateByUrl("/ROS/login");
        this.logger.log("Something Went Wrong! Login Again");
      }

      // this.router.navigateByUrl("/ROS/dashborad");
    } else this.logger.log("Login Failed");
  }

  logout() {
    this.user = null;
    this.token = null;
    localStorage.removeItem("ROStoken");
    localStorage.removeItem("ROSrestaurants");
    localStorage.removeItem("ROSselectedRestaurant");
    localStorage.removeItem("ROSuser");
    this.logger.log("User Logged Out");
    // this.router.navigateByUrl("");
    this.ngxPermissions.flushPermissions();
    this.msalService.logout();
  }

  setUserPermissions() {
    this.ngxPermissions.flushPermissions();
    let permissions = this.getRestaurant().permissions;
    // this.logger.log(permissions);
    if (permissions) {
      this.ngxPermissions.loadPermissions(permissions);
    }
    this.logger.log("Permissions has been loaded again");
  }

  setRestaurants(user) {
    this.restaurants = user.restaurants;
    this.selectedRestaurant = user.restaurants
      ? user.restaurants.find((x) => x["isPrimary"])
      : null;

    localStorage.setItem("ROSrestaurants", JSON.stringify(this.restaurants));
    localStorage.setItem(
      "ROSselectedRestaurant",
      JSON.stringify(this.selectedRestaurant)
    );
  }

  setAuthToken(token) {
    localStorage.setItem("ROStoken", token);
    this.token = token;
    this.loggedIn = false;
  }

  getToken() {
    let token = JSON.parse(localStorage.getItem("ROStoken"));
    if (token) return token;
    return this.token;
  }

  getAllUserRestaurants() {
    let restaurants = JSON.parse(localStorage.getItem("ROSrestaurants"));
    if (restaurants) return restaurants;
    return this.restaurants;
  }

  getRestaurant() {
    let selectedRestaurant = JSON.parse(
      localStorage.getItem("ROSselectedRestaurant")
    );
    if (selectedRestaurant) return selectedRestaurant;
    return this.selectedRestaurant;
  }

  getUserDetails() {
    let user = JSON.parse(localStorage.getItem("ROSuser"));
    if (user) return user;
    return this.user;
  }

  changeRestaurants(resName: string) {
    this.selectedRestaurant = this.getAllUserRestaurants().find(
      (x) => x.name === resName
    );
    localStorage.setItem(
      "ROSselectedRestaurant",
      JSON.stringify(this.selectedRestaurant)
    );
    this.setUserPermissions();
  }

  isLoggedIn() {
    this.logger.log("User is logged in", this.loggedIn);
    return this.loggedIn;
  }
}
