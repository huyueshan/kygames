import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { ZjhuaComponent } from './zjhua.component';
import { ZjhuaService } from './zjhua.service';
const routes = [
  {
    path: "",
    component: ZjhuaComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  declarations: [ZjhuaComponent],
  providers: [ZjhuaService]
})
export class ZjhuaModule { }
