import { ExtraOptions, RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { AuthGuard } from "../app/pas/auth/auth.guard";


export const routes: Routes = [
  {
    path: "ROS",
    loadChildren: () => import("./pas/pas.module").then((m) => m.PASModule),
  },

  { path: "", redirectTo: "ROS", pathMatch: "full" },
  { path: "**", redirectTo: "ROS" },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
