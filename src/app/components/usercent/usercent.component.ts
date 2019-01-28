import { Component, OnInit, ElementRef } from "@angular/core";

import { BaseService } from "../../services/base.service";

@Component({
  selector: "app-usercent",
  templateUrl: "./usercent.component.html",
  styleUrls: ["./usercent.component.scss"]
})
export class UsercentComponent implements OnInit {
  public navlist = ["资 料", "认 证"];
  public cur_nav_index = 0;
  public act_value = "资 料";
  public test = true;

  public games = [
    {
      name: "抢庄牛牛",
      src: "../../../assets/images/user/popup/grzx_12.png",
      max_type: ["06c", "06d", "07a", "07b", "07c"]
    },
    {
      name: "斗地主",
      src: "../../../assets/images/user/popup/grzx_13.png"
    },
    {
      name: "炸金花",
      src: "../../../assets/images/user/popup/grzx_14.png"
    },
    {
      name: "麻将",
      src: "../../../assets/images/user/popup/grzx_15.png"
    },
    {
      name: "三公",
      src: "../../../assets/images/user/popup/grzx_16.png"
    },
    {
      name: "德州扑克",
      src: "../../../assets/images/user/popup/grzx_17.png"
    }
  ];
  public cur_game_index = 0;

  public acinfo = {
    // 认证数据
    name: "",
    phone: "",
    email: "",
    bankcard: ""
  };

  constructor(public Base: BaseService, public el: ElementRef) {}

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.drag(); //添加选择游戏区域拖动事件
  }

  public li_click(i, val) {
    this.cur_nav_index = i;
    this.act_value = val;
  }

  public drag() {
    let p = this.el.nativeElement.querySelector("#gamesbox");
    let c = this.el.nativeElement.querySelector("#dragbox");
    let pw = parseFloat(this.getStyle(p).width);
    let cw = parseFloat(this.getStyle(c).width);
    c.onselectstart = function() {
      return false;
    };
    c.onmousedown = function(e) {
      var ev = e || event;
      var oLeft = c.offsetLeft;
      var aleft = ev.clientX - oLeft;
      c.onmousemove = function(e) {
        var ev = e || event;
        var curleft = ev.clientX - aleft;
        c.style.left =
          curleft > 0
            ? 0 + "px"
            : curleft < pw - cw
            ? pw - cw + "px"
            : curleft + "px";
      };
    };
    c.onmouseup = function() {
      c.onmousemove = function() {
        null;
      };
    };
    c.onmouseleave = function() {
      c.onmousemove = function() {
        null;
      };
    };
  }
  public getStyle(el, name = null) {
    if (window.getComputedStyle) {
      return window.getComputedStyle(el, name);
    } else {
      return el.currentStyle[name];
    }
  }
  public nodray(e) {
    e.preventDefault();
  }
}
