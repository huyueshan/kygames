import { Component, OnInit } from "@angular/core";

import { BaseService } from "../../services/base.service";

@Component({
  selector: "app-record",
  templateUrl: "./record.component.html",
  styleUrls: ["./record.component.scss"]
})
export class RecordComponent implements OnInit {
  public data = new Array(10);
  constructor(public Base: BaseService) {}

  ngOnInit() {}
}
