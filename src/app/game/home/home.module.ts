import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeService } from './homeStore.service';

const routes = [
  {
    path: "",
    component: HomeComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  declarations: [HomeComponent],
  providers: [HomeService]
})
export class HomeModule { }
