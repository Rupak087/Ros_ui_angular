import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthServiceService {
  constructor(private http: HttpClient, router: Router) {}

  login(data) {
    let result = { status: "200", authenticated: false, token: "" };
    if (data.email === "ros@gmail.com" && data.pass === "12345") {
      result.authenticated = true;
      result.token = "ABCD1234";
    }
    return result;
  }
  logout() {
    let url = "http:ROS/api/logout";
    // this.http.get(url)
    console.log("Logout successfull");
  }
}
