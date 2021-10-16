import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { AuthFacadeService } from "../facade/auth-facade.service";

@Component({
  selector: "ngx-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  myimage: string = "assets/images/7.jpg";
  constructor(
    private router: Router,
    private authFacade: AuthFacadeService,
    private title: Title
  ) {
    this.title.setTitle("ROS - Login");
  }

  ngOnInit(): void {}

  showDiv = {
    login: true,
    forgot: false,
    password: false,
    reset: false,
    confirm: false,
    update: false,
  };
  dashboard() {
    this.router.navigateByUrl("/ROS/dashborad");
  }
  register() {
    this.router.navigateByUrl("/ROS/register");
  }
  loginToAzure() {
    this.authFacade.loginToAzure();
  }
}
