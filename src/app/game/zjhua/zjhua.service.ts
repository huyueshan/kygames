import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { BaseService } from "../../services/base.service";
import { Utils } from "../../factory/utils.js";

@Injectable()
export class ZjhuaService {

  constructor(public Base: BaseService, private router: Router) { }

  public CW; // 画布宽度
  public CH; // 画布高度
  public CS; // 画布缩放比例
  public STATE: number = 0; // 当前画布绘制状态
  public EVENT = []; // 存储当前页面有事件绑定的区域坐标
  public FPS = 100; // 屏幕绘制帧率
  public DELAY = 0; // 服务器延迟时间 ms
  // public CountDown: number = 0; //倒计时时间 不等于0时会自动倒计时 s

  public CVDATA={};
  public initiate = {
    // img data  属性名以 'I_' 开头
    I_top_left: {
      type: "IMG",
      src: "../../../assets/images/common/baseicon_02.png",
      uiw: 267,
      uih: 140,
      xtl: 0,
      ytt: 0
    },
    I_top_back: {
      type: "IMG",
      src: "../../../assets/images/common/baseicon_06.png",
      uiw: 68,
      uih: 70,
      xtl: 50,
      ytt: 32,
      padding: 4,
      shape: "circle",
      event: true,
      eventdata: {
        click: function(serve, callback = null) {
          serve.router.navigate(["game/home"]);
          callback && typeof callback == "function" && callback();
        }
      }
    },
    I_top_log: {
      type: "IMG",
      src: "../../../assets/images/zjhua/zjh_03.png",
      uiw: 145,
      uih: 50,
      xtl: 280,
      ytt: 30
    },

    I_top_linebg: {
      type: "IMG",
      src: "../../../assets/images/common/baseicon_11.png",
      uiw: 303,
      uih: 48,
      xtl: 480,
      ytt: 32
    },
    I_top_rest: {
      type: "IMG",
      src: "../../../assets/images/common/baseicon_04.png",
      uiw: 50,
      uih: 50,
      xtl: 736,
      ytt: 30,
      shape: "circle",
      event: true,
      eventdata: {
        click: function(serve, callback = null) {
          console.log("点击了充值");
          callback && typeof callback == "function" && callback();
        }
      }
    },
    I_top_rest_add: {
      type: "IMG",
      src: "../../../assets/images/common/baseicon_05.png",
      uiw: 28,
      uih: 28,
      xtl: 747,
      ytt: 40
    },
    I_top_record: {
      type: "IMG",
      src: "../../../assets/images/common/baseicon_12.png",
      uiw: 68,
      uih: 70,
      xtr: 390,
      ytt: 16,
      padding: 4,
      shape: "circle",
      event: true,
      eventdata: {
        click: function(serve, callback = null) {
          serve.Base.Popup_Page = 5;
          console.log("点击了记录");
          callback && typeof callback == "function" && callback();
        }
      }
    },
    I_top_rule: {
      type: "IMG",
      src: "../../../assets/images/common/baseicon_07.png",
      uiw: 68,
      uih: 70,
      xtr: 296,
      ytt: 16,
      padding: 4,
      shape: "circle",
      event: true,
      eventdata: {
        click: function(serve, callback = null) {
          serve.Base.Popup_Page = 2;
          console.log("点击了规则");
          callback && typeof callback == "function" && callback();
        }
      }
    },
    I_top_set: {
      type: "IMG",
      src: "../../../assets/images/common/baseicon_08.png",
      uiw: 68,
      uih: 70,
      xtr: 202,
      ytt: 16,
      padding: 4,
      shape: "circle",
      event: true,
      eventdata: {
        click: function(serve, callback = null) {
          serve.Base.Popup_Page = 1;
          console.log("点击了设置");
          callback && typeof callback == "function" && callback();
        }
      }
    },
    I_tip_bg: {
      type: "IMG",
      src: "../../../assets/images/common/tip_bg.png",
      uiw: 1160,
      uih: 80,
      xto: -580,
      ytt: 108
    },
    I_tip_bell: {
      type: "IMG",
      src: "../../../assets/images/common/LB.png",
      uiw: 50,
      uih: 42,
      xto: -560,
      ytt: 126
    },
    I_icon_man: {
      type: "IMG",
      src: "../../../assets/images/zjhua/lobby/zjh_14.png",
      uiw: 531,
      uih: 802,
      xto: -850,
      ytb: 802
    },


    // // 动画
    A_top_coin: {
      type: "ANIMATED",
      src: "../../../assets/images/common/coin/coin_",
      uiw: 58,
      uih: 58,
      xtl: 474,
      ytt: 24,
      length: 8,
      step: 200,
      currindex: 0,
      doauto: true
    },
    A_top_delay: {
      type: "ANIMATED",
      src: "../../../assets/images/common/delay/dilay_",
      uiw: 58,
      uih: 36,
      xtr: 106,
      ytt: 22,
      length: 6,
      step: 1000,
      currindex: 0
    },

    // font data   属性名以 'F_' 开头
    // 基本文字对象
    F_font: {
      type: "FONT"
    },

    // 粗体
    F_font_wt: {
      type: "FONT",
      wt: "bold"
    },

    // 公告条文字
    F_top_tips: {
      type: "FONT",
      doauto: true,
      aniconfig: function(o, fps) {
        o.translateX -= (2 * fps) / 100;
        if (Math.abs(o.translateX) > Math.abs(o.str.length * o.size + 1000)) {
          o.translateX = 0;
        }
      }
    }
  };

}
