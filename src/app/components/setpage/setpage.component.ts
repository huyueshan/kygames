import { Component, OnInit } from "@angular/core";

import { BaseService } from "../../services/base.service";
@Component({
  selector: "app-setpage",
  templateUrl: "./setpage.component.html",
  styleUrls: ["./setpage.component.scss"]
})
export class SetpageComponent implements OnInit {
  constructor(public Base: BaseService) {}

  ngOnInit() {}

  public onOff(name, value) {
    let M = this.Base.Music;
    M[name].switch = value;
    M[name].value = value ? 0.6 : 0;

    if (M[name].doms) {
      for (let i = 0; i < M[name].doms.length; i++) {
        M[name].doms[i].volume = M[name].value;
      }
    } else {
      M[name].dom.volume = M[name].value;
    }
  }
  public rangeChange(name) {
    let M = this.Base.Music;
    M[name].switch = M[name].value <= 0 ? false : true;

    if (M[name].doms) {
      for (let i = 0; i < M[name].doms.length; i++) {
        M[name].doms[i].volume = M[name].value;
      }
    } else {
      M[name].dom.volume = M[name].value;
    }
  }
}
