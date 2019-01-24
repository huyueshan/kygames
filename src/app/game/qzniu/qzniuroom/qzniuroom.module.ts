import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { QzniuroomComponent } from './qzniuroom.component';
import { QzniuroomStoreService } from './qzniuroomStore.service';

const routes = [
  {
    path: "",
    redirectTo: "chuji",
    pathMatch: 'full',
  },
  {
    path: ":id",
    component: QzniuroomComponent
  },
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  declarations: [QzniuroomComponent],
  providers: [QzniuroomStoreService]
})
export class QzniuroomModule { }
