import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BaseService } from "../../services/base.service";
import { Utils } from "../../factory/utils.js";

@Injectable()
export class SangService {
  constructor(public Base: BaseService, private router: Router) {}

  public CW; // 画布宽度
  public CH; // 画布高度
  public CS; // 画布缩放比例
  public STATE: number = 0; // 当前画布绘制状态
  public EVENT = []; // 存储当前页面有事件绑定的区域坐标
  public FPS = 100; // 屏幕绘制帧率
  public DELAY = 0; // 服务器延迟时间 ms
  // public CountDown: number = 0; //倒计时时间 不等于0时会自动倒计时 s

  public CVDATA = {};
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
      src: "../../../assets/images/sang/log.png",
      uiw: 97,
      uih: 49,
      xtl: 310,
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
      src: "../../../assets/images/sang/lobby/model.png",
      uiw: 642,
      uih: 776,
      xto: -846,
      yto: -320,
      aniconfig: function(o, fps) {
        switch (o.anistate) {
          case 0:
            o.translateY += (5 * fps) / 100;
            if (o.translateY >= 50) {
              o.anistate = 1;
            }
            break;
          case 1:
            o.translateY -= (5 * fps) / 100;
            if (o.translateY <= 0) {
              o.anistate = 0;
            }
            break;
          default:
            break;
        }
      }
    },


    // 体验房
    I_room0_bg: {
      type: "IMG",
      src: "../../../assets/images/sang/lobby/room_0.png",
      uiw: 470,
      uih: 252,
      xto: -144,
      yto: -302,
      event: true,
      eventdata: {
        click: function(serve, callback = null) {
          serve.router.navigate(["game/sangroom/tiyan"]);
          callback && typeof callback == "function" && callback();
        }
      }
    },
    A_room0_twirl: {
      type: "ANIMATED",
      src: "../../../assets/images/sang/lobby/twirl/twir_",
      uiw: 130,
      uih: 136,
      xto: 56,
      yto: -184,
      length: 10,
      step: 200,
      currindex: 0,
      doauto: true,
    },

    A_room0_circle: {
      type: "ANIMATED",
      src: "../../../assets/images/sang/lobby/circle/circle_",
      uiw: 470,
      uih: 252,
      xto: -144,
      yto: -302,
      length: 12,
      step: 300,
      currindex: 0,
      doauto: true,
    },
    A_room0_anicon: {
      type: "ANIMATED",
      src: "../../../assets/images/sang/lobby/room0/room0_anicon_",
      uiw: 298,
      uih: 252,
      xto: -184,
      yto: -330,
      length: 7,
      step: 200,
      currindex: 0,
      doauto: true,
      danimate:true,
      danimateconfig:[100,5000]
    },
    A_room0_glint: {
      type: "ANIMATED",
      src: "../../../assets/images/sang/lobby/glint/glint_",
      uiw: 50,
      uih: 50,
      xto: 230,
      yto: -260,
      length: 5,
      step: 200,
      currindex: 0,
      doauto: true,
      danimate: true,
      danimateconfig:[100,5000]
    },

    // 初级房
    I_room1_bg: {
      type: "IMG",
      src: "../../../assets/images/sang/lobby/room_1.png",
      uiw: 470,
      uih: 252,
      xto: 330,
      yto: -302,
      event: true,
      eventdata: {
        click: function(serve, callback = null) {
          serve.router.navigate(["game/sangroom/chuji"]);
          callback && typeof callback == "function" && callback();
        }
      }
    },
    A_room1_twirl: {
      type: "ANIMATED",
      src: "../../../assets/images/sang/lobby/twirl/twir_",
      uiw: 130,
      uih: 136,
      xto: 530,
      yto: -186,
      length: 10,
      step: 200,
      currindex: 0,
      doauto: true,
    },

    A_room1_circle: {
      type: "ANIMATED",
      src: "../../../assets/images/sang/lobby/circle/circle_",
      uiw: 470,
      uih: 252,
      xto: 330,
      yto: -302,
      length: 12,
      step: 300,
      computeindex: 6,
      doauto: true,
    },
    A_room1_anicon: {
      type: "ANIMATED",
      src: "../../../assets/images/sang/lobby/room1/room1_anicon_",
      uiw: 246,
      uih: 252,
      xto: 320,
      yto: -330,
      length: 7,
      step: 200,
      currindex: 0,
      doauto: true,
      danimate:true,
      danimateconfig:[100,5000]
    },
    A_room1_glint: {
      type: "ANIMATED",
      src: "../../../assets/images/sang/lobby/glint/glint_",
      uiw: 50,
      uih: 50,
      xto: 704,
      yto: -260,
      length: 5,
      step: 200,
      currindex: 0,
      doauto: true,
      danimate: true,
      danimateconfig:[100,8000]
    },


    // 中级房
    I_room2_bg: {
      type: "IMG",
      src: "../../../assets/images/sang/lobby/room_2.png",
      uiw: 470,
      uih: 252,
      xto: -144,
      yto: -46,
      event: true,
      eventdata: {
        click: function(serve, callback = null) {
          serve.router.navigate(["game/sangroom/zhongji"]);
          callback && typeof callback == "function" && callback();
        }
      }
    },
    A_room2_twirl: {
      type: "ANIMATED",
      src: "../../../assets/images/sang/lobby/twirl/twir_",
      uiw: 130,
      uih: 136,
      xto: 56,
      yto: 70,
      length: 10,
      step: 200,
      currindex: 0,
      doauto: true,
    },

    A_room2_circle: {
      type: "ANIMATED",
      src: "../../../assets/images/sang/lobby/circle/circle_",
      uiw: 470,
      uih: 252,
      xto: -144,
      yto: -46,
      length: 12,
      step: 300,
      computeindex: 4,
      doauto: true,
    },
    A_room2_anicon: {
      type: "ANIMATED",
      src: "../../../assets/images/sang/lobby/room2/room2_anicon_",
      uiw: 260,
      uih: 252,
      xto: -166,
      yto: -74,
      length: 7,
      step: 200,
      currindex: 0,
      doauto: true,
      danimate:true,
      danimateconfig:[100,5000]
    },
    A_room2_glint: {
      type: "ANIMATED",
      src: "../../../assets/images/sang/lobby/glint/glint_",
      uiw: 50,
      uih: 50,
      xto: 230,
      yto: -4,
      length: 5,
      step: 200,
      currindex: 0,
      doauto: true,
      danimate: true,
      danimateconfig:[100,5000]
    },

    // 高级房
    I_room3_bg: {
      type: "IMG",
      src: "../../../assets/images/sang/lobby/room_3.png",
      uiw: 470,
      uih: 252,
      xto: 330,
      yto: -46,
      event: true,
      eventdata: {
        click: function(serve, callback = null) {
          serve.router.navigate(["game/sangroom/gaoji"]);
          callback && typeof callback == "function" && callback();
        }
      }
    },
    A_room3_twirl: {
      type: "ANIMATED",
      src: "../../../assets/images/sang/lobby/twirl/twir_",
      uiw: 130,
      uih: 136,
      xto: 530,
      yto: 70,
      length: 10,
      step: 200,
      currindex: 0,
      doauto: true,
    },

    A_room3_circle: {
      type: "ANIMATED",
      src: "../../../assets/images/sang/lobby/circle/circle_",
      uiw: 470,
      uih: 252,
      xto: 330,
      yto: -46,
      length: 12,
      step: 300,
      computeindex: 4,
      doauto: true,
    },
    A_room3_anicon: {
      type: "ANIMATED",
      src: "../../../assets/images/sang/lobby/room3/room3_anicon_",
      uiw: 242,
      uih: 252,
      xto: 330,
      yto: -74,
      length: 7,
      step: 200,
      currindex: 0,
      doauto: true,
      danimate:true,
      danimateconfig:[100,5000]
    },
    A_room3_glint: {
      type: "ANIMATED",
      src: "../../../assets/images/sang/lobby/glint/glint_",
      uiw: 50,
      uih: 50,
      xto: 704,
      yto: -4,
      length: 5,
      step: 200,
      currindex: 0,
      doauto: true,
      danimate: true,
      danimateconfig:[100,5000]
    },


    // 王者房
    I_room4_bg: {
      type: "IMG",
      src: "../../../assets/images/sang/lobby/room_4.png",
      uiw: 470,
      uih: 252,
      xto: -144,
      yto: 210,
      event: true,
      eventdata: {
        click: function(serve, callback = null) {
          serve.router.navigate(["game/sangroom/wangzhe"]);
          callback && typeof callback == "function" && callback();
        }
      }
    },
    A_room4_twirl: {
      type: "ANIMATED",
      src: "../../../assets/images/sang/lobby/twirl/twir_",
      uiw: 130,
      uih: 136,
      xto: 56,
      yto: 326,
      length: 10,
      step: 200,
      currindex: 0,
      doauto: true,
    },

    A_room4_circle: {
      type: "ANIMATED",
      src: "../../../assets/images/sang/lobby/circle/circle_",
      uiw: 470,
      uih: 252,
      xto: -144,
      yto: 210,
      length: 12,
      step: 300,
      computeindex: 10,
      doauto: true,
    },
    A_room4_anicon: {
      type: "ANIMATED",
      src: "../../../assets/images/sang/lobby/room4/room4_anicon_",
      uiw: 296,
      uih: 252,
      xto: -186,
      yto: 200,
      length: 7,
      step: 200,
      currindex: 0,
      doauto: true,
      danimate:true,
      danimateconfig:[100,5000]
    },
    A_room4_glint: {
      type: "ANIMATED",
      src: "../../../assets/images/sang/lobby/glint/glint_",
      uiw: 50,
      uih: 50,
      xto: 230,
      yto: 252,
      length: 5,
      step: 200,
      currindex: 0,
      doauto: true,
      danimate: true,
      danimateconfig:[100,5000]
    },

    // 至尊房
    I_room5_bg: {
      type: "IMG",
      src: "../../../assets/images/sang/lobby/room_5.png",
      uiw: 470,
      uih: 252,
      xto: 330,
      yto: 210,
      event: true,
      eventdata: {
        click: function(serve, callback = null) {
          serve.router.navigate(["game/sangroom/zhizun"]);
          callback && typeof callback == "function" && callback();
        }
      }
    },
    A_room5_twirl: {
      type: "ANIMATED",
      src: "../../../assets/images/sang/lobby/twirl/twir_",
      uiw: 130,
      uih: 136,
      xto: 530,
      yto: 326,
      length: 10,
      step: 200,
      currindex: 0,
      doauto: true,
    },

    A_room5_circle: {
      type: "ANIMATED",
      src: "../../../assets/images/sang/lobby/circle/circle_",
      uiw: 470,
      uih: 252,
      xto: 330,
      yto: 210,
      length: 12,
      step: 300,
      computeindex: 3,
      doauto: true,
    },
    A_room5_anicon: {
      type: "ANIMATED",
      src: "../../../assets/images/sang/lobby/room5/room5_anicon_",
      uiw: 274,
      uih: 252,
      xto: 314,
      yto: 180,
      length: 7,
      step: 200,
      currindex: 0,
      doauto: true,
      danimate:true,
      danimateconfig:[100,5000]
    },
    A_room5_glint: {
      type: "ANIMATED",
      src: "../../../assets/images/sang/lobby/glint/glint_",
      uiw: 50,
      uih: 50,
      xto: 704,
      yto: 252,
      length: 5,
      step: 200,
      currindex: 0,
      doauto: true,
      danimate: true,
      danimateconfig:[100,5000]
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
    A_bg: {
      type: "ANIMATED",
      src: "../../../assets/images/sang/lobby/bg/bg_0000",
      uiw: 1920,
      uih: 1080,
      xtl: 0,
      ytt: 0,
      length: 12,
      step: 200,
      currindex: 0,
      doauto: true,
    },
    A_left_smog: {
      type: "ANIMATED",
      src: "../../../assets/images/sang/lobby/smog/smog_",
      uiw: 198,
      uih: 465,
      xto: -800,
      yto: -320,
      length: 6,
      step: 200,
      currindex: 0,
      doauto: true,
      aniconfig: function(o, fps) {
        switch (o.anistate) {
          case 0:
            o.translateY += (5 * fps) / 100;
            if (o.translateY >= 50) {
              o.anistate = 1;
            }
            break;
          case 1:
            o.translateY -= (5 * fps) / 100;
            if (o.translateY <= 0) {
              o.anistate = 0;
            }
            break;
          default:
            break;
        }
      }
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
