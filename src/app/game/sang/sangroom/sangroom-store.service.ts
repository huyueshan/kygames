import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BaseService } from "../../../services/base.service";
import { Utils } from "../../../factory/utils.js";

@Injectable()
export class SangroomStoreService {
  constructor(public Base: BaseService, private router: Router) {}

  public CW; // 画布宽度
  public CH; // 画布高度
  public CS; // 画布缩放比例

  public CVDATA; // 绘制对象 ！！所有绘制对象都必须映射到CVDATA对象里！！
  public EVENT = []; // 存储当前页面有事件绑定的区域坐标
  public FPS: number; // 屏幕绘制帧率
  public Compute; //存储当前用户选牌对象 active属性控制是否可以继续进行选中操作
  public DELAY = 0; // 服务器延迟时间 ms
  public STATE; // 当前画布绘制状态
  public CountDown: number; //倒计时时间 不等于0时调用会自动倒计时 s

  public PKP_img; // 扑克牌正面片（一副52张，不含大小王）
  public PKP; // 扑克牌数据对象

  // 各玩家发牌位置
  public PkpGroup = {
    player0: {
      pkname: [
        "I_py0_pkp_0",
        "I_py0_pkp_1",
        "I_py0_pkp_2",
      ],
      origin: { xto: 150, yto: 330 }, // 收牌坐标位置
      site: [
        { xto: 30, yto: 330 },
        { xto: 150, yto: 330 },
        { xto: 270, yto: 330 },
      ]
    },
    player1: {
      pkname: [
        "I_py1_pkp_0",
        "I_py1_pkp_1",
        "I_py1_pkp_2",
      ],
      origin: { xto: 480, yto: 140 }, // 收牌坐标位置
      site: [
        { xto: 360, yto: 140 },
        { xto: 420, yto: 140 },
        { xto: 480, yto: 140 },
      ]
    },
    player2: {
      pkname: [
        "I_py2_pkp_0",
        "I_py2_pkp_1",
        "I_py2_pkp_2",
      ],
      origin: { xto: 480, yto: -160 }, // 收牌坐标位置
      site: [
        { xto: 360, yto: -160 },
        { xto: 420, yto: -160 },
        { xto: 480, yto: -160 },
      ]
    },
    player3: {
      pkname: [
        "I_py3_pkp_0",
        "I_py3_pkp_1",
        "I_py3_pkp_2",
      ],
      origin: { xto: -598, yto: -160 }, // 收牌坐标位置
      site: [
        { xto: -478, yto: -160 },
        { xto: -538, yto: -160 },
        { xto: -598, yto: -160 },
      ]
    },
    player4: {
      pkname: [
        "I_py4_pkp_0",
        "I_py4_pkp_1",
        "I_py4_pkp_2",
      ],
      origin: { xto: -598, yto: 140 }, // 收牌坐标位置
      site: [
        { xto: -478, yto: 140 },
        { xto: -538, yto: 140 },
        { xto: -598, yto: 140 },
      ]
    }
  };

  // 庄家图标位置
  public zhuang_position = [
    {
      xto: -386,
      yto: 304
    },
    {
      xto: 614,
      yto: 74
    },
    {
      xto: 614,
      yto: -226
    },
    {
      xto: -652,
      yto: -226
    },
    {
      xto: -652,
      yto: 74
    }
  ];

  // ！！所有绘制对象都必须映射到CVDATA对象里！！
  public initiate = {
    // img data  属性名以 'I_' 开头
    I_top_left: {
      type: "IMG",
      src: "../../../../assets/images/common/baseicon_02.png",
      uiw: 267,
      uih: 140,
      xtl: 0,
      ytt: 0
    },
    I_top_back: {
      type: "IMG",
      src: "../../../../assets/images/common/baseicon_06.png",
      uiw: 68,
      uih: 70,
      xtl: 50,
      ytt: 32,
      padding: 4,
      shape: "circle",
      event: true,
      eventdata: {
        click: function(serve, callback = null) {
          if (serve.STATE.animate > 11) {
            serve.STATE.popup = 2;
          } else {
            serve.STATE.popup = 3;
          }
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
      src: "../../../../assets/images/common/baseicon_11.png",
      uiw: 303,
      uih: 48,
      xtl: 480,
      ytt: 32
    },
    I_top_rest: {
      type: "IMG",
      src: "../../../../assets/images/common/baseicon_04.png",
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
      src: "../../../../assets/images/common/baseicon_05.png",
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
      src: "../../../../assets/images/common/baseicon_07.png",
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
      src: "../../../../assets/images/common/baseicon_08.png",
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
      src: "../../../../assets/images/qzniu/room/top_tip_bg.png",
      uiw: 630,
      uih: 80,
      xto: 250,
      ytt: 118
    },
    I_tip_bell: {
      type: "IMG",
      src: "../../../../assets/images/common/LB.png",
      uiw: 50,
      uih: 42,
      xto: 270,
      ytt: 136
    },

    I_desk: {
      type: "IMG",
      src: "../../../../assets/images/sang/room/desk.png",
      uiw: 1710,
      uih: 897,
      xto: -855,
      yto: -360
    },
    A_croupier: {
      type: "ANIMATED",
      src: "../../../../assets/images/sang/room/croupier/croupier_",
      uiw: 232,
      uih: 238,
      xto: -116,
      yto: -426,
      length: 4,
      step: 100,
      currindex: 0,
      doauto: true,
      danimate: true,
      danimateconfig: [1000, 10000]
    },

    // 动画
    // 公告条文字
    F_top_tips: {
      type: "FONT",
      doauto: true,
      aniconfig: function(o, fps) {
        o.translateX -= (2 * fps) / 100;
        if (Math.abs(o.translateX) > Math.abs(o.str.length * o.size + 500)) {
          o.translateX = 0;
        }
      }
    },
    A_top_coin: {
      type: "ANIMATED",
      src: "../../../../assets/images/common/coin/coin_",
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
      src: "../../../../assets/images/common/delay/dilay_",
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

    F_font_dot_loding: {
      type: "FONT",
      store: { str: "", dot: "" },
      aniconfig: function(o, fps) {
        o.str = o.store.str + o.store.dot;
        switch (o.anistate) {
          case 0:
            let win0 = o.tiemrs(400, fps);
            if (win0) {
              o.setattr("translateX", 0), (o.store.dot = "");
              o.anistate = 1;
            }
            break;
          case 1:
            let win1 = o.tiemrs(400, fps);
            if (win1) {
              o.setattr("translateX", -10), (o.store.dot = ".");
              o.anistate = 2;
            }
            break;
          case 2:
            let win2 = o.tiemrs(400, fps);
            if (win2) {
              o.setattr("translateX", -20), (o.store.dot = "..");
              o.anistate = 3;
            }
            break;
          case 3:
            let win3 = o.tiemrs(400, fps);
            if (win3) {
              o.setattr("translateX", -30), (o.store.dot = "...");
              o.anistate = 0;
            }
            break;
        }
      }
    },

    // 粗体
    F_font_wt: {
      type: "FONT",
      wt: "bold"
    }
  };

  public component = {
    I_py_zhuang: {
      type: "IMG",
      src: "../../../../assets/images/sang/room/zhuang.png",
      uiw: 42,
      uih: 42
    },
    I_shade_30: {
      type: "IMG",
      src: "../../../../assets/images/common/opacity_30.png",
      uiw: 442,
      uih: 400,
      xtl: 0,
      ytt: 0,
      event: true,
      eventdata: {
        click: function(serve, callback = null) {
          callback && typeof callback == "function" && callback();
          return;
        }
      }
    },
    I_pups_bg: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/room/pup_bg_01.png",
      uiw: 868,
      uih: 540,
      xto: -434,
      yto: -280
    },
    I_pups_close: {
      type: "IMG",
      src: "../../../../assets/images/common/close_icon.png",
      uiw: 100,
      uih: 102,
      xto: 360,
      yto: -306,
      padding: 10,
      shape: "circle",
      event: true,
      eventdata: {
        click: function(serve, callback = null) {
          serve.STATE.popup = 0;
          callback && typeof callback == "function" && callback();
        }
      }
    },
    I_btn_yes: {
      type: "IMG",
      src: "../../../../assets/images/common/btn_yes.png",
      uiw: 150,
      uih: 64,
      xto: -175,
      yto: 90,
      event: true,
      eventdata: {
        click: function(serve, callback = null) {
          serve.STATE.popup = 0;
          if (serve.STATE.animate > 11) {
            serve.router.navigate(["game/qzniu"]);
          }
          callback && typeof callback == "function" && callback();
        }
      }
    },
    // I_btn_cancel: {
    //   type: "IMG",
    //   src: "../../../../assets/images/qzniu/room/btn_cancel.png",
    //   uiw: 150,
    //   uih: 64,
    //   xto: 25,
    //   yto: 90,
    //   event: true,
    //   eventdata: {
    //     click: function(serve, callback = null) {
    //       serve.STATE.popup = 0;
    //       callback && typeof callback == "function" && callback();
    //     }
    //   }
    // },
    I_btn_continue: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/room/btn_continue.png",
      uiw: 270,
      uih: 92,
      xto: -135,
      yto: 210,
      event: true,
      eventdata: {
        click: function(serve, callback = null) {
          console.log("点击了继续游戏");
          callback && typeof callback == "function" && callback();
        }
      }
    },

    A_pups_close: {
      type: "ANIMATED",
      src: "../../../../assets/images/qzniu/room/close/close_anibg_",
      uiw: 100,
      uih: 102,
      xto: 360,
      yto: -306,
      length: 12,
      step: 200,
      doauto: true
    },

    I_time_bg: {
      type: "IMG",
      src: "../../../../assets/images/sang/room/time_bg.png",
      uiw: 114,
      uih: 114,
      xto: -57,
      yto: 20
    },

    // 中间定时器文字
    F_mid_timer: {
      type: "FONT",
      c: "#F0DD0A",
      wt: "bolder",
      size: 40,
      xto: -9,
      yto: -15,
      Gradient: true,
      Gradient_data: ["#FEFA7D", "#F0DD0A", "#F0DD0A", "#FB7E16"],
      aniconfig: function(o, fps) {
        switch (o.anistate) {
          case 0:
            o.size += (10 * fps) / 100;
            o.translateX -= o.str.length * 3;
            o.translateY -= 5;
            if (o.size >= 80) {
              o.anistate = 1;
            }
            break;

          case 1:
            o.size -= (10 * fps) / 100;
            o.translateX += o.str.length * 3;
            o.translateY += 5;
            if (o.size <= 30) {
              o.str = "";
              o.show = false;
              o.size = 30;
              o.anistate = 0;
              o.translateX = 0;
              o.translateY = 0;
            }
            break;
        }
      }
    },

    A_py_Banker: {
      type: "ANIMATED",
      src: "../../../../assets/images/sang/room/banker_line/banker_line_",
      uiw: 276,
      uih: 334,
      xto: -758,
      yto: 322,
      length: 3,
      step: 200,
      doauto: true,
      animationce: true
    }
  };

  public py0 = {
    I_py0_bg_01: {
      type: "IMG",
      src: "../../../../assets/images/sang/room/play0_bg0.png",
      uiw: 367,
      uih: 172,
      xto: -370,
      yto: 320
    },
    I_py0_bg_02: {
      type: "IMG",
      src: "../../../../assets/images/sang/room/play0_bg1.png",
      uiw: 379,
      uih: 184,
      xto: -376,
      yto: 314
    },
    A_py0_bg_03: {
      type: "ANIMATED",
      src: "../../../../assets/images/sang/room/banker_line/banker0_line_",
      uiw: 487,
      uih: 270,
      xto: -430,
      yto: 271,
      length: 3,
      step: 200,
      doauto: true,
      animationce: true
    },
    I_py0_face: {
      type: "IMG",
      src: "../../../../assets/images/common/head_imgs/face_0.png",
      uiw: 116,
      uih: 116,
      xto: -342,
      yto: 348
    },
    A_py0_Banker: {
      type: "ANIMATED",
      src: "../../../../assets/images/sang/room/banker_line/banker0_line_",
      uiw: 276,
      uih: 334,
      xto: -758,
      yto: 322,
      length: 3,
      step: 200,
      doauto: true
    }
  };
  public py0_pkp = {
    I_py0_pkp_0: {
      type: "IMG",
      src: "../../../../assets/images/sang/room/pkp/12d.png",
      uiw: 118,
      uih: 150,
      xto: 30,
      yto: 330,
      anistate: 1,
      aniconfig: function(o, fps) {
        switch (o.anistate) {
          case 0:
            break;
          case 1:
            o.anistate = 0;
            break;
          case 2:
            let win2 = o.transition(
              [["xto", -350, -250, 200], ["yto", 350, 160, 200]],
              fps
            );
            if (win2) {
              o.setattr("anistate", -1);
              o.setattr("event", false);
              o.setattr("translateY", 0);
            }
            break;
          case 3:
            let win3 = o.transition([["xto", -250, -50, 400]], fps);
            win3 && (o.anistate = 0);
            break;
          case 4:
            let win4 = o.transition([["xto", -50, -140, 400]], fps);
            win4 && (o.anistate = 0);
            break;
          default:
            break;
        }
      }
    },
    I_py0_pkp_1: {
      type: "IMG",
      src: "../../../../assets/images/sang/room/pkp/07d.png",
      uiw: 118,
      uih: 150,
      xto: 30,
      yto: 330,
      anistate: 1,
      aniconfig: function(o, fps) {
        switch (o.anistate) {
          case 0:
            break;
          case 1:
            let win1 = o.transition([["xto", 30, 150, 200]], fps);
            win1 && (o.anistate = 0);
            break;
          case 2:
            let win2 = o.transition(
              [["xto", 50, 130, 200], ["yto", 350, 160, 200]],
              fps
            );
            if (win2) {
              o.setattr("anistate", -1);
              o.setattr("event", false);
              o.setattr("translateY", 0);
            }
            break;
          case 3:
            let win3 = o.transition([["xto", -150, -50, 400]], fps);
            win3 && (o.anistate = 0);
            break;
          case 4:
            let win4 = o.transition([["xto", -50, -100, 400]], fps);
            win4 && (o.anistate = 0);
            break;
        }
      }
    },
    I_py0_pkp_2: {
      type: "IMG",
      src: "../../../../assets/images/sang/room/pkp/01c.png",
      uiw: 118,
      uih: 150,
      xto: 30,
      yto: 330,
      anistate: 1,
      aniconfig: function(o, fps) {
        switch (o.anistate) {
          case 0:
            break;
          case 1:
            let win1 = o.transition([["xto", 30, 270, 500]], fps);
            win1 && (o.anistate = 0);
            break;
          case 2:
            // let win2 = o.transition(
            //   [["yto", 350, 160, 200]],
            //   fps
            // );
            // if (win2) {
            o.setattr("anistate", -1);
            // o.setattr("translateY", 0);
            // }
            break;
          case 3:
            let win3 = o.transition([["xto", -50, -50, 400]], fps);
            win3 && (o.anistate = 0);
            break;
          case 4:
            let win4 = o.transition([["xto", -50, -60, 400]], fps);
            win4 && (o.anistate = 0);
            break;
        }
      }
    }
  };

  public py1 = {
    I_py1_bg_01: {
      type: "IMG",
      src: "../../../../assets/images/sang/room/play1_bg0.png",
      uiw: 172,
      uih: 222,
      xto: 630,
      yto: 90
    },
    I_py1_bg_02: {
      type: "IMG",
      src: "../../../../assets/images/sang/room/play1_bg1.png",
      uiw: 184,
      uih: 234,
      xto: 624,
      yto: 84
    },
    I_py1_face: {
      type: "IMG",
      src: "../../../../assets/images/common/head_imgs/face_1.png",
      uiw: 116,
      uih: 116,
      xto: 658,
      yto: 140
    }
  };
  public py1_pkp = {
    I_py1_pkp_0: {
      type: "IMG",
      src: "../../../../assets/images/sang/room/pkp/12d.png",
      uiw: 118,
      uih: 150,
      xto: 480,
      yto: 140,
      anistate: 1,
      aniconfig: function(o, fps) {
        switch (o.anistate) {
          case 0:
            break;
          case 1:
            let win1 = o.transition([["xto", 480, 360, 200]], fps);
            win1 && (o.anistate = 0);
            break;
          case 2:
            let win2 = o.transition(
              [["xto", -350, -250, 200], ["yto", 350, 160, 200]],
              fps
            );
            if (win2) {
              o.setattr("anistate", -1);
              o.setattr("event", false);
              o.setattr("translateY", 0);
            }
            break;
          case 3:
            let win3 = o.transition([["xto", -250, -50, 400]], fps);
            win3 && (o.anistate = 0);
            break;
          case 4:
            let win4 = o.transition([["xto", -50, -140, 400]], fps);
            win4 && (o.anistate = 0);
            break;
          default:
            break;
        }
      }
    },
    I_py1_pkp_1: {
      type: "IMG",
      src: "../../../../assets/images/sang/room/pkp/03a.png",
      uiw: 118,
      uih: 150,
      xto: 480,
      yto: 140,
      anistate: 1,
      aniconfig: function(o, fps) {
        switch (o.anistate) {
          case 0:
            break;
          case 1:
            let win1 = o.transition([["xto", 480, 420, 200]], fps);
            win1 && (o.anistate = 0);
            break;
          case 2:
            let win2 = o.transition(
              [["xto", 50, 130, 200], ["yto", 350, 160, 200]],
              fps
            );
            if (win2) {
              o.setattr("anistate", -1);
              o.setattr("event", false);
              o.setattr("translateY", 0);
            }
            break;
          case 3:
            let win3 = o.transition([["xto", -150, -50, 400]], fps);
            win3 && (o.anistate = 0);
            break;
          case 4:
            let win4 = o.transition([["xto", -50, -100, 400]], fps);
            win4 && (o.anistate = 0);
            break;
        }
      }
    },
    I_py1_pkp_2: {
      type: "IMG",
      src: "../../../../assets/images/sang/room/pkp/01c.png",
      uiw: 118,
      uih: 150,
      xto: 480,
      yto: 140,
      anistate: 1,
      aniconfig: function(o, fps) {
        switch (o.anistate) {
          case 0:
            break;
          case 1:
            o.anistate = 0;
            break;
          case 2:
            // let win2 = o.transition(
            //   [["yto", 350, 160, 200]],
            //   fps
            // );
            // if (win2) {
            o.setattr("anistate", -1);
            // o.setattr("translateY", 0);
            // }
            break;
          case 3:
            let win3 = o.transition([["xto", -50, -50, 400]], fps);
            win3 && (o.anistate = 0);
            break;
          case 4:
            let win4 = o.transition([["xto", -50, -60, 400]], fps);
            win4 && (o.anistate = 0);
            break;
        }
      }
    }
  };

  public py2 = {
    I_py2_bg_01: {
      type: "IMG",
      src: "../../../../assets/images/sang/room/play1_bg0.png",
      uiw: 172,
      uih: 222,
      xto: 630,
      yto: -210
    },
    I_py2_bg_02: {
      type: "IMG",
      src: "../../../../assets/images/sang/room/play1_bg1.png",
      uiw: 184,
      uih: 234,
      xto: 624,
      yto: -216
    },
    I_py2_face: {
      type: "IMG",
      src: "../../../../assets/images/common/head_imgs/face_1.png",
      uiw: 116,
      uih: 116,
      xto: 658,
      yto: -160
    }
  };
  public py2_pkp = {
    I_py2_pkp_0: {
      type: "IMG",
      src: "../../../../assets/images/sang/room/pkp/12d.png",
      uiw: 118,
      uih: 150,
      xto: 480,
      yto: -160,
      anistate: 1,
      aniconfig: function(o, fps) {
        switch (o.anistate) {
          case 0:
            break;
          case 1:
            let win1 = o.transition([["xto", 480, 360, 200]], fps);
            win1 && (o.anistate = 0);
            break;
          case 2:
            let win2 = o.transition(
              [["xto", -350, -250, 200], ["yto", 350, 160, 200]],
              fps
            );
            if (win2) {
              o.setattr("anistate", -1);
              o.setattr("event", false);
              o.setattr("translateY", 0);
            }
            break;
          case 3:
            let win3 = o.transition([["xto", -250, -50, 400]], fps);
            win3 && (o.anistate = 0);
            break;
          case 4:
            let win4 = o.transition([["xto", -50, -140, 400]], fps);
            win4 && (o.anistate = 0);
            break;
          default:
            break;
        }
      }
    },
    I_py2_pkp_1: {
      type: "IMG",
      src: "../../../../assets/images/sang/room/pkp/03a.png",
      uiw: 118,
      uih: 150,
      xto: 480,
      yto: -160,
      anistate: 1,
      aniconfig: function(o, fps) {
        switch (o.anistate) {
          case 0:
            break;
          case 1:
            let win1 = o.transition([["xto", 480, 420, 200]], fps);
            win1 && (o.anistate = 0);
            break;
          case 2:
            let win2 = o.transition(
              [["xto", 50, 130, 200], ["yto", 350, 160, 200]],
              fps
            );
            if (win2) {
              o.setattr("anistate", -1);
              o.setattr("event", false);
              o.setattr("translateY", 0);
            }
            break;
          case 3:
            let win3 = o.transition([["xto", -150, -50, 400]], fps);
            win3 && (o.anistate = 0);
            break;
          case 4:
            let win4 = o.transition([["xto", -50, -100, 400]], fps);
            win4 && (o.anistate = 0);
            break;
        }
      }
    },
    I_py2_pkp_2: {
      type: "IMG",
      src: "../../../../assets/images/sang/room/pkp/01c.png",
      uiw: 118,
      uih: 150,
      xto: 480,
      yto: -160,
      anistate: 1,
      aniconfig: function(o, fps) {
        switch (o.anistate) {
          case 0:
            break;
          case 1:
            o.anistate = 0;
            break;
          case 2:
            // let win2 = o.transition(
            //   [["yto", 350, 160, 200]],
            //   fps
            // );
            // if (win2) {
            o.setattr("anistate", -1);
            // o.setattr("translateY", 0);
            // }
            break;
          case 3:
            let win3 = o.transition([["xto", -50, -50, 400]], fps);
            win3 && (o.anistate = 0);
            break;
          case 4:
            let win4 = o.transition([["xto", -50, -60, 400]], fps);
            win4 && (o.anistate = 0);
            break;
        }
      }
    }
  };


  public py3 = {
    I_py3_bg_01: {
      type: "IMG",
      src: "../../../../assets/images/sang/room/play1_bg0.png",
      uiw: 172,
      uih: 222,
      xto: -800,
      yto: -210
    },
    I_py3_bg_02: {
      type: "IMG",
      src: "../../../../assets/images/sang/room/play1_bg1.png",
      uiw: 184,
      uih: 234,
      xto: -806,
      yto: -216
    },
    I_py3_face: {
      type: "IMG",
      src: "../../../../assets/images/common/head_imgs/face_3.png",
      uiw: 116,
      uih: 116,
      xto: -772,
      yto: -160
    }
  };
  public py3_pkp = {
    I_py3_pkp_0: {
      type: "IMG",
      src: "../../../../assets/images/sang/room/pkp/12d.png",
      uiw: 118,
      uih: 150,
      xto: -598,
      yto: -160,
      anistate: 1,
      aniconfig: function(o, fps) {
        switch (o.anistate) {
          case 0:
            break;
          case 1:
            o.anistate = 0;
            break;
          case 2:
            let win2 = o.transition(
              [["xto", -350, -250, 200], ["yto", 350, 160, 200]],
              fps
            );
            if (win2) {
              o.setattr("anistate", -1);
              o.setattr("event", false);
              o.setattr("translateY", 0);
            }
            break;
          case 3:
            let win3 = o.transition([["xto", -250, -50, 400]], fps);
            win3 && (o.anistate = 0);
            break;
          case 4:
            let win4 = o.transition([["xto", -50, -140, 400]], fps);
            win4 && (o.anistate = 0);
            break;
          default:
            break;
        }
      }
    },
    I_py3_pkp_1: {
      type: "IMG",
      src: "../../../../assets/images/sang/room/pkp/03a.png",
      uiw: 118,
      uih: 150,
      xto: -598,
      yto: -160,
      anistate: 1,
      aniconfig: function(o, fps) {
        switch (o.anistate) {
          case 0:
            break;
          case 1:
            let win1 = o.transition([["xto", -598, -538, 200]], fps);
            win1 && (o.anistate = 0);
            break;
          case 2:
            let win2 = o.transition(
              [["xto", 50, 130, 200], ["yto", 350, 160, 200]],
              fps
            );
            if (win2) {
              o.setattr("anistate", -1);
              o.setattr("event", false);
              o.setattr("translateY", 0);
            }
            break;
          case 3:
            let win3 = o.transition([["xto", -150, -50, 400]], fps);
            win3 && (o.anistate = 0);
            break;
          case 4:
            let win4 = o.transition([["xto", -50, -100, 400]], fps);
            win4 && (o.anistate = 0);
            break;
        }
      }
    },
    I_py3_pkp_2: {
      type: "IMG",
      src: "../../../../assets/images/sang/room/pkp/01c.png",
      uiw: 118,
      uih: 150,
      xto: -598,
      yto: -160,
      anistate: 1,
      aniconfig: function(o, fps) {
        switch (o.anistate) {
          case 0:
            break;
          case 1:
          let win1 = o.transition([["xto", -598, -478, 200]], fps);
          win1 && (o.anistate = 0);
            break;
          case 2:
            // let win2 = o.transition(
            //   [["yto", 350, 160, 200]],
            //   fps
            // );
            // if (win2) {
            o.setattr("anistate", -1);
            // o.setattr("translateY", 0);
            // }
            break;
          case 3:
            let win3 = o.transition([["xto", -50, -50, 400]], fps);
            win3 && (o.anistate = 0);
            break;
          case 4:
            let win4 = o.transition([["xto", -50, -60, 400]], fps);
            win4 && (o.anistate = 0);
            break;
        }
      }
    }
  };


  public py4 = {
    I_py4_bg_01: {
      type: "IMG",
      src: "../../../../assets/images/sang/room/play1_bg0.png",
      uiw: 172,
      uih: 222,
      xto: -800,
      yto: 90
    },
    I_py4_bg_02: {
      type: "IMG",
      src: "../../../../assets/images/sang/room/play1_bg1.png",
      uiw: 184,
      uih: 234,
      xto: -806,
      yto: 84
    },
    I_py4_face: {
      type: "IMG",
      src: "../../../../assets/images/common/head_imgs/face_4.png",
      uiw: 116,
      uih: 116,
      xto: -772,
      yto: 140
    }
  };
  public py4_pkp = {
    I_py4_pkp_0: {
      type: "IMG",
      src: "../../../../assets/images/sang/room/pkp/12d.png",
      uiw: 118,
      uih: 150,
      xto: -598,
      yto: 140,
      anistate: 1,
      aniconfig: function(o, fps) {
        switch (o.anistate) {
          case 0:
            break;
          case 1:
            o.anistate = 0;
            break;
          case 2:
            let win2 = o.transition(
              [["xto", -350, -250, 200], ["yto", 350, 160, 200]],
              fps
            );
            if (win2) {
              o.setattr("anistate", -1);
              o.setattr("event", false);
              o.setattr("translateY", 0);
            }
            break;
          case 3:
            let win3 = o.transition([["xto", -250, -50, 400]], fps);
            win3 && (o.anistate = 0);
            break;
          case 4:
            let win4 = o.transition([["xto", -50, -140, 400]], fps);
            win4 && (o.anistate = 0);
            break;
          default:
            break;
        }
      }
    },
    I_py4_pkp_1: {
      type: "IMG",
      src: "../../../../assets/images/sang/room/pkp/03a.png",
      uiw: 118,
      uih: 150,
      xto: -598,
      yto: 140,
      anistate: 1,
      aniconfig: function(o, fps) {
        switch (o.anistate) {
          case 0:
            break;
          case 1:
            let win1 = o.transition([["xto", -598, -538, 200]], fps);
            win1 && (o.anistate = 0);
            break;
          case 2:
            let win2 = o.transition(
              [["xto", 50, 130, 200], ["yto", 350, 160, 200]],
              fps
            );
            if (win2) {
              o.setattr("anistate", -1);
              o.setattr("event", false);
              o.setattr("translateY", 0);
            }
            break;
          case 3:
            let win3 = o.transition([["xto", -150, -50, 400]], fps);
            win3 && (o.anistate = 0);
            break;
          case 4:
            let win4 = o.transition([["xto", -50, -100, 400]], fps);
            win4 && (o.anistate = 0);
            break;
        }
      }
    },
    I_py4_pkp_2: {
      type: "IMG",
      src: "../../../../assets/images/sang/room/pkp/01c.png",
      uiw: 118,
      uih: 150,
      xto: -598,
      yto: 140,
      anistate: 1,
      aniconfig: function(o, fps) {
        switch (o.anistate) {
          case 0:
            break;
          case 1:
          let win1 = o.transition([["xto", -598, -478, 200]], fps);
          win1 && (o.anistate = 0);
            break;
          case 2:
            // let win2 = o.transition(
            //   [["yto", 350, 160, 200]],
            //   fps
            // );
            // if (win2) {
            o.setattr("anistate", -1);
            // o.setattr("translateY", 0);
            // }
            break;
          case 3:
            let win3 = o.transition([["xto", -50, -50, 400]], fps);
            win3 && (o.anistate = 0);
            break;
          case 4:
            let win4 = o.transition([["xto", -50, -60, 400]], fps);
            win4 && (o.anistate = 0);
            break;
        }
      }
    }
  };


}
