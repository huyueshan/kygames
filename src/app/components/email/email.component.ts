import { Component, OnInit } from '@angular/core';

import { BaseService } from "../../services/base.service";

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {

  public cur_table = 0;
  constructor(public Base: BaseService) { }

  ngOnInit() {
  }

}
