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
    try {
      M[name].dom.volume = M[name].value;
      if (M[name].players && M[name].players.lenght) {
        for (let i = 0; i < M[name].players.lenght; i++) {
          M[name].players[i].volume = M[name].value;
        }
      }
    } catch (error) { }
  }
  public rangeChange(name) {
    let M = this.Base.Music;
    M[name].switch = M[name].value <= 0 ? false : true;
    try {
      M[name].dom.volume = M[name].value;
      if (M[name].players && M[name].players.lenght) {
        for (let i = 0; i < M[name].players.lenght; i++) {
          M[name].players[i].volume = M[name].value;
        }
      }
    } catch (error) {}
  }
}
