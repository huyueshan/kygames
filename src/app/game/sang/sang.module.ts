import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { SangComponent } from './sang.component';
import { SangService } from './sang.service';
const routes = [
  {
    path: "",
    component: SangComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  declarations: [SangComponent],
  providers: [SangService]
})
export class SangModule { }
