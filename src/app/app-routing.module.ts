import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "game",
    pathMatch: "full"
  },
  {
    path: "index",
    loadChildren: "./game/kygame/kygame.module#KygameModule"
  },
  {
    path: "login",
    loadChildren: "./user/login/login.module#LoginModule"
  },
  {
    path: "register",
    loadChildren: "./user/register/register.module#RegisterModule"
  },
  {
    path: "game",
    loadChildren: "./game/game.module#GameModule"
  },
  {
    path: "**",
    redirectTo: "game",
    pathMatch: "full"
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
