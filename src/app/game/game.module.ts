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

      // 抢庄牛牛大厅
      {
        path: "qzniu",
        loadChildren: "../game/qzniu/qzniu.module#QzniuModule"
      },

      // 抢庄牛牛房间
      {
        path: "qzniuroom",
        loadChildren: "../game/qzniu/qzniuroom/qzniuroom.module#QzniuroomModule"
      },

      // 炸金花大厅
      {
        path: "zjhua",
        loadChildren: "../game/zjhua/zjhua.module#ZjhuaModule"
      },

      // 三公大厅
      {
        path: "sang",
        loadChildren: "../game/sang/sang.module#SangModule"
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
