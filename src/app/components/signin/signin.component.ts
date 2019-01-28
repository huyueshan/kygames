import { Component, OnInit } from "@angular/core";

import { BaseService } from "../../services/base.service";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"]
})
export class SigninComponent implements OnInit {
  public data = [
    { name: "第一天", money: 100, active: true },
    { name: "第二天", money: 300, active: true },
    { name: "第三天", money: 500, active: true },
    { name: "第四天", money: 800, active: false },
    { name: "第五天", money: 1200, active: false },
    { name: "第六天", money: 1800, active: false },
    { name: "第七天", money: 2500, active: true }
  ];

  public qddata = {
    beforedays: [
      this.data[0],
      this.data[1],
      this.data[2],
      this.data[3],
      this.data[4],
      this.data[5]
    ],
    lastday: this.data[6]
  };

  constructor(public Base: BaseService) {}

  ngOnInit() {}
}
