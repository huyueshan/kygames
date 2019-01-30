import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BaseService } from "../../services/base.service";
import { Utils } from "../../factory/utils.js";

@Injectable()
export class QzniuStoreService {
  constructor(public Base: BaseService, private router: Router) {}

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
      src: "../../../assets/images/qzniu/qznn_09.png",
      uiw: 194,
      uih: 50,
      xtl: 260,
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
    I_icon_man_sign: {
      type: "IMG",
      src: "../../../assets/images/qzniu/lobby/qznn_35.png",
      uiw: 648,
      uih: 843,
      xto: -850,
      ytb: 843,
      aniconfig: function(o, fps) {
        switch (o.anistate) {
          case 0:
            o.scaling += (0.005 * fps) / 100;
            if (o.scaling >= 1.04) {
              o.anistate = 1;
            }
            break;
          case 1:
            o.scaling -= (0.01 * fps) / 100;
            if (o.scaling <= 1.02) {
              o.anistate = 2;
            }
            break;
          case 2:
            o.scaling += (0.01 * fps) / 100;
            if (o.scaling >= 1.06) {
              o.anistate = 3;
            }
            break;
          case 3:
            o.scaling -= (0.02 * fps) / 100;
            if (o.scaling <= 0.96) {
              o.anistate = 0;
            }
            break;

          default:
            break;
        }
      }
    },
    I_icon_man: {
      type: "IMG",
      src: "../../../assets/images/qzniu/lobby/qznn_35.png",
      uiw: 648,
      uih: 843,
      xto: -920,
      ytb: 843
    },
    I_icon_money: {
      type: "IMG",
      src: "../../../assets/images/qzniu/lobby/qznn_23.png",
      uiw: 28,
      uih: 27
    },
    I_icon_room_bg: {
      type: "IMG",
      src: "../../../assets/images/qzniu/lobby/qznn_21.png",
      uiw: 187,
      uih: 135
    },

    I_room_numb0: {
      type: "IMG",
      src: "../../../assets/images/qzniu/lobby/qznn_20.png",
      uiw: 350,
      uih: 340,
      xto: -314,
      yto: -286,
      padding: 4,
      event: true,
      eventdata: {
        click: function(serve, callback = null) {
          serve.router.navigate(["game/qzniuroom/tiyan"]);
          callback && typeof callback == "function" && callback();
        }
      }
    },
    I_icon_numb0: {
      type: "IMG",
      src: "../../../assets/images/qzniu/lobby/qznn_22.png",
      uiw: 138,
      uih: 122,
      xto: -210,
      yto: -194
    },

    I_room_numb1: {
      type: "IMG",
      src: "../../../assets/images/qzniu/lobby/qznn_24.png",
      uiw: 350,
      uih: 340,
      xto: 66,
      yto: -286,
      padding: 4,
      event: true,
      eventdata: {
        click: function(serve, callback = null) {
          serve.router.navigate(["game/qzniuroom/chuji"]);
          callback && typeof callback == "function" && callback();
        }
      }
    },

    I_room_numb2: {
      type: "IMG",
      src: "../../../assets/images/qzniu/lobby/qznn_26.png",
      uiw: 350,
      uih: 340,
      xto: 446,
      yto: -286,
      padding: 4,
      event: true,
      eventdata: {
        click: function(serve, callback = null) {
          serve.router.navigate(["game/qzniuroom/zhongji"]);
          callback && typeof callback == "function" && callback();
        }
      }
    },
    I_icon_numb2: {
      type: "IMG",
      src: "../../../assets/images/qzniu/lobby/qznn_27.png",
      uiw: 128,
      uih: 130,
      xto: 562,
      yto: -200,
      aniconfig: function(o, fps) {
        switch (o.anistate) {
          case 0:
            o.scaling += (0.005 * fps) / 100;
            if (o.scaling >= 1.04) {
              o.anistate = 1;
            }
            break;
          case 1:
            o.scaling -= (0.01 * fps) / 100;
            if (o.scaling <= 1.02) {
              o.anistate = 2;
            }
            break;
          case 2:
            o.scaling += (0.01 * fps) / 100;
            if (o.scaling >= 1.06) {
              o.anistate = 3;
            }
            break;
          case 3:
            o.scaling -= (0.02 * fps) / 100;
            if (o.scaling <= 0.96) {
              o.anistate = 0;
            }
            break;

          default:
            break;
        }
      }
    },

    I_room_numb3: {
      type: "IMG",
      src: "../../../assets/images/qzniu/lobby/qznn_28.png",
      uiw: 350,
      uih: 340,
      xto: -314,
      yto: 66,
      padding: 4,
      event: true,
      eventdata: {
        click: function(serve, callback = null) {
          serve.router.navigate(["game/qzniuroom/gaoji"]);
          callback && typeof callback == "function" && callback();
        }
      }
    },
    I_icon_numb3: {
      type: "IMG",
      src: "../../../assets/images/qzniu/lobby/gj_0.png",
      uiw: 156,
      uih: 124,
      xto: -222,
      yto: 154,
    },

    I_room_numb4: {
      type: "IMG",
      src: "../../../assets/images/qzniu/lobby/qznn_30.png",
      uiw: 350,
      uih: 340,
      xto: 66,
      yto: 66,
      padding: 4,
      event: true,
      eventdata: {
        click: function(serve, callback = null) {
          serve.router.navigate(["game/qzniuroom/wangzhe"]);
          callback && typeof callback == "function" && callback();
        }
      }
    },
    I_icon_numb4: {
      type: "IMG",
      src: "../../../assets/images/qzniu/lobby/qznn_31.png",
      uiw: 137,
      uih: 142,
      xto: 168,
      yto: 137,
      aniconfig: function(o, fps) {
        switch (o.anistate) {
          case 0:
            o.scaling -= (0.05 * fps) / 100;
            if (o.scaling <= 0.98) {
              o.anistate = 1;
            }
            break;
          case 1:
            o.scaling += (0.01 * fps) / 100;
            if (o.scaling >= 1.02) {
              o.anistate = 2;
            }
            break;
          case 2:
            o.scaling -= (0.01 * fps) / 100;
            if (o.scaling <= 0.96) {
              o.anistate = 3;
            }
            break;
          case 3:
            o.scaling += (0.02 * fps) / 100;
            if (o.scaling >= 1.2) {
              o.anistate = 0;
            }
            break;

          default:
            break;
        }
      }
    },

    I_room_numb5: {
      type: "IMG",
      src: "../../../assets/images/qzniu/lobby/qznn_32.png",
      uiw: 350,
      uih: 340,
      xto: 446,
      yto: 66,
      padding: 4,
      event: true,
      eventdata: {
        click: function(serve, callback = null) {
          serve.router.navigate(["game/qzniuroom/dianfeng"]);
          callback && typeof callback == "function" && callback();
        }
      }
    },
    I_icon_numb5: {
      type: "IMG",
      src: "../../../assets/images/qzniu/lobby/qznn_33.png",
      uiw: 111,
      uih: 99,
      xto: 550,
      yto: 182
    },

    // 动画
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
    A_belle: {
      type: "ANIMATED",
      src: "../../../assets/images/qzniu/lobby/belle/belle_",
      uiw: 685,
      uih: 894,
      xto: -938,
      ytb: 870,
      length: 18,
      step: 200,
      currindex: 0,
      doauto: true
    },
    A_room_numb1: {
      type: "ANIMATED",
      src: "../../../assets/images/qzniu/lobby/room_1/df_",
      uiw: 350,
      uih: 320,
      xto: 66,
      yto: -286,
      length: 9,
      step: 200,
      currindex: 0,
      doauto: true
    },
    A_room_numb3: {
      type: "ANIMATED",
      src: "../../../assets/images/qzniu/lobby/room_3/r3_",
      uiw: 192,
      uih: 152,
      xto: -240,
      yto: 140,
      length: 11,
      step: 200,
      currindex: 0,
      doauto: true
    },

    A_game_star_small_0: {
      type: "ANIMATED",
      src: "../../../assets/images/common/star/star_",
      uiw: 175,
      uih: 190,
      length: 10,
      step: 200,
      currindex: 0,
      doauto: true,
      danimate: true,
      danimateconfig: [0, 5000]
    },
    A_game_star_small_1: {
      type: "ANIMATED",
      src: "../../../assets/images/common/star/star_",
      uiw: 175,
      uih: 190,
      length: 10,
      step: 200,
      currindex: 0,
      doauto: true,
      danimate: true,
      danimateconfig: [600, 10000]
    },
    A_game_star_small_2: {
      type: "ANIMATED",
      src: "../../../assets/images/common/star/star_",
      uiw: 175,
      uih: 190,
      length: 10,
      step: 200,
      currindex: 0,
      doauto: true,
      danimate: true,
      danimateconfig: [600, 10000]
    },
    A_game_star_small_3: {
      type: "ANIMATED",
      src: "../../../assets/images/common/star/star_",
      uiw: 175,
      uih: 190,
      length: 10,
      step: 200,
      currindex: 0,
      doauto: true,
      danimate: true,
      danimateconfig: [600, 10000]
    },
    A_game_star_small_4: {
      type: "ANIMATED",
      src: "../../../assets/images/common/star/star_",
      uiw: 175,
      uih: 190,
      length: 10,
      step: 200,
      currindex: 0,
      doauto: true,
      danimate: true,
      danimateconfig: [600, 10000]
    },
    A_game_star_small_5: {
      type: "ANIMATED",
      src: "../../../assets/images/common/star/star_",
      uiw: 175,
      uih: 190,
      length: 10,
      step: 200,
      currindex: 0,
      doauto: true,
      danimate: true,
      danimateconfig: [600, 10000]
    },
    A_game_room_numb5: {
      type: "ANIMATED",
      src: "../../../assets/images/qzniu/lobby/room_5/df_",
      uiw: 143,
      uih: 135,
      xto: 600,
      yto: 130,
      length: 10,
      step: 200,
      currindex: 0,
      doauto: true
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
