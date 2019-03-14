import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { SangroomComponent } from './sangroom.component';
import { SangroomStoreService } from './sangroomStore.service';


const routes = [
  {
    path: "",
    redirectTo: "tiyan",
    pathMatch: 'full',
  },
  {
    path: ":id",
    component: SangroomComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  declarations: [SangroomComponent],
  providers: [SangroomStoreService]
})
export class SangroomModule { }
