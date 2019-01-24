import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { QzniuComponent } from './qzniu.component';

const routes = [
  {
    path: "",
    component: QzniuComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  declarations: [QzniuComponent],
  providers: []
})
export class QzniuModule { }
