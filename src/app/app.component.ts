import { Component, OnInit, AfterContentInit, ElementRef } from "@angular/core";

import { BaseService } from "./services/base.service";

@Component({
  selector: "app-root",
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit, AfterContentInit {
  title = "app";
  constructor(public Base: BaseService, public el: ElementRef) {}

  ngOnInit() {
  }
  ngAfterContentInit(){
  }
}
