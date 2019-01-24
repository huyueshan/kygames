import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { QzniuComponent } from './qzniu.component';
import { QzniuStoreService } from './qzniuStore.service';

const routes = [
  {
    path: "",
    component: QzniuComponent,
  },
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  declarations: [QzniuComponent],
  providers: [QzniuStoreService]
})
export class QzniuModule { }
