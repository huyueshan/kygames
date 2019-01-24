import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module'
import { GameComponent } from './game.component';

const routes = [
  {
    path: "",
    component:  GameComponent,
    children: [
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
      },

      // 游戏大厅首页
      {
        path: "home",
        loadChildren: "../game/home/home.module#HomeModule"
      },

      // 抢庄牛牛首页
      {
        path: "qzniu",
        loadChildren: "../game/qzniu/qzniu.module#QzniuModule"
      },

      // 抢庄牛牛房间
      {
        path: "qzniuroom",
        loadChildren: "../game/qzniu/qzniuroom/qzniuroom.module#QzniuroomModule"
      },

    ],
  },

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ComponentsModule
  ],
  declarations: [GameComponent]
})
export class GameModule { }
