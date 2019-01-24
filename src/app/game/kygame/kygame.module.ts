import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

import { KygameComponent } from "./kygame.component";
import { KyserviceService } from "./kystore.service";

const routes = [
  {
    path: "",
    component: KygameComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  declarations: [KygameComponent],
  providers: [KyserviceService]
})
export class KygameModule {}
