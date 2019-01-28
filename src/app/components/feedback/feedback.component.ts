import { Component, OnInit } from '@angular/core';

import { BaseService } from "../../services/base.service";

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  constructor(public Base: BaseService) { }

  ngOnInit() {
  }

}
