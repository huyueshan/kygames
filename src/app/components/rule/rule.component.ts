import { Component, OnInit } from '@angular/core';

import { BaseService } from "../../services/base.service";

@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.scss']
})
export class RuleComponent implements OnInit {

  public navlist=['抢庄玩法介绍','牌型算法','牌型大小','牌型倍数','关于我们'];
  public cur_nav_index=0;
  public act_value = '抢庄玩法介绍';

  constructor(public Base: BaseService) { }

  ngOnInit() {
  }

  public li_click(i,val){
    this.cur_nav_index = i;
    this.act_value = val;
  }
}
