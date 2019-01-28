import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BaseService } from "../../../services/base.service";
import { Utils } from "../../../factory/utils.js";

@Injectable()
export class QzniuroomStoreService {
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
        "I_py0_pkp_3",
        "I_py0_pkp_4"
      ],
      origin: { xto: -50, yto: 350 }, // 收牌坐标位置
      site: [
        { xto: -250, yto: 350 },
        { xto: -150, yto: 350 },
        { xto: -50, yto: 350 },
        { xto: 50, yto: 350 },
        { xto: 150, yto: 350 }
      ]
    },
    player1: {
      pkname: [
        "I_py1_pkp_0",
        "I_py1_pkp_1",
        "I_py1_pkp_2",
        "I_py1_pkp_3",
        "I_py1_pkp_4"
      ],
      origin: { xto: 526, yto: -60 }, // 收牌坐标位置
      site: [
        { xto: 526, yto: -60 },
        { xto: 506, yto: -60 },
        { xto: 486, yto: -60 },
        { xto: 466, yto: -60 },
        { xto: 446, yto: -60 }
      ]
    },
    player2: {
      pkname: [
        "I_py2_pkp_0",
        "I_py2_pkp_1",
        "I_py2_pkp_2",
        "I_py2_pkp_3",
        "I_py2_pkp_4"
      ],
      origin: { xto: -50, yto: -200 }, // 收牌坐标位置
      site: [
        { xto: -90, yto: -200 },
        { xto: -70, yto: -200 },
        { xto: -50, yto: -200 },
        { xto: -30, yto: -200 },
        { xto: -10, yto: -200 }
      ]
    },
    player3: {
      pkname: [
        "I_py3_pkp_0",
        "I_py3_pkp_1",
        "I_py3_pkp_2",
        "I_py3_pkp_3",
        "I_py3_pkp_4"
      ],
      origin: { xto: -624, yto: -60 }, // 收牌坐标位置
      site: [
        { xto: -624, yto: -60 },
        { xto: -604, yto: -60 },
        { xto: -584, yto: -60 },
        { xto: -564, yto: -60 },
        { xto: -544, yto: -60 }
      ]
    }
  };

  // ！！所有绘制对象都必须映射到CVDATA对象里！！
  public initiate = {
    // img data  属性名以 'I_' 开头
    I_top_left: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/qznn_02.png",
      uiw: 267,
      uih: 140,
      xtl: 0,
      ytt: 0
    },
    I_top_back: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/qznn_06.png",
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
      src: "../../../../assets/images/qzniu/qznn_09.png",
      uiw: 194,
      uih: 50,
      xtl: 260,
      ytt: 30
    },

    I_top_linebg: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/qznn_11.png",
      uiw: 303,
      uih: 48,
      xtl: 480,
      ytt: 32
    },
    I_top_rest: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/qznn_04.png",
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
      src: "../../../../assets/images/qzniu/qznn_05.png",
      uiw: 28,
      uih: 28,
      xtl: 747,
      ytt: 40
    },
    I_top_record: {
      type: "IMG",
      src: "../../../assets/images/qzniu/qznn_12.png",
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
      src: "../../../../assets/images/qzniu/qznn_07.png",
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
      src: "../../../../assets/images/qzniu/qznn_08.png",
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
      src: "../../../../assets/images/qzniu/LB.png",
      uiw: 50,
      uih: 42,
      xto: 270,
      ytt: 136
    },

    I_desk: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/room/desk.png",
      uiw: 1676,
      uih: 808,
      xto: -838,
      yto: -320
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
      src: "../../../../assets/images/qzniu/room/zhuang.png",
      uiw: 64,
      uih: 64,
      anistate: 1,
      scaling: 0.2,
      aniconfig: function(o, fps) {
        switch (o.anistate) {
          case 0:
            break;
          case 1:
            let win1 = o.transition([["scaling", 0.2, 1, 400]], fps);
            if (win1) {
              o.anistate = 0;
            }
            break;
        }
      }
    },
    I_time_bg: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/room/time_bg.png",
      uiw: 136,
      uih: 136,
      xto: -68,
      yto: -50
    },
    I_compute_bg: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/room/compute_bg.png",
      uiw: 600,
      uih: 90,
      xto: -300,
      yto: 180
    },
    I_begin_bg: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/room/tips_bg.png",
      uiw: 1280,
      uih: 210,
      xto: -640,
      yto: -75
    },
    I_begin_icon: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/room/begin_icon.png",
      uiw: 541,
      uih: 384,
      xto: -270,
      yto: -186,
      scaling: 0.3,
      anistate: 1,
      aniconfig: function(o, fps) {
        switch (o.anistate) {
          case 0:
            break;
          case 1:
            o.transition([["scaling", 0.2, 1.2, 400]], fps) &&
              o.setattr("anistate", 0);
            break;
        }
      }
    },
    I_tips_bg: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/room/tips_bg.png",
      uiw: 442,
      uih: 40,
      xto: -221,
      yto: 100
    },
    I_tip_achieve0: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/room/tip_achieve.png",
      uiw: 210,
      uih: 50,
      xto: -105,
      yto: 234,
      dopen: true,
      delayconfig: { open: 200 }
    },
    I_tip_achieve: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/room/tip_achieve.png",
      uiw: 210,
      uih: 50
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
      src: "../../../../assets/images/qzniu/room/close_icon.png",
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
    I_btn_cancel: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/room/btn_cancel.png",
      uiw: 150,
      uih: 64,
      xto: 25,
      yto: 90,
      event: true,
      eventdata: {
        click: function(serve, callback = null) {
          serve.STATE.popup = 0;
          callback && typeof callback == "function" && callback();
        }
      }
    },
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
    I_zh_win_bg: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/room/zh_win_bg.png",
      uiw: 942,
      uih: 936,
      xto: -471,
      yto: -430,
      scaling: 0.8,
      anistate: 0,
      rotate: 0,
      aniconfig: function(o, fps) {
        o.transition([["rotate", 0, 400]], fps, 10);
        o.rotate = o.rotate >= 360 ? 0 : o.rotate;
      }
    },
    I_zh_win_icon: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/room/zh_win_icon.png",
      uiw: 570,
      uih: 249,
      xto: -285,
      yto: -125,
      scaling: 4,
      anistate: 1,
      aniconfig: function(o, fps) {
        switch (o.anistate) {
          case 0:
            break;
          case 1:
            let win1 = o.transition([["scaling", 4, 1, 800]], fps);
            if (win1) {
              o.setattr("anistate", 0);
            }
            break;
        }
      }
    },
    I_player_win_icon: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/room/player_win_01.png",
      uiw: 570,
      uih: 260,
      xto: -285,
      yto: -130,
      scaling: 4,
      anistate: 1,
      aniconfig: function(o, fps) {
        switch (o.anistate) {
          case 0:
            break;
          case 1:
            let win1 = o.transition([["scaling", 4, 1, 800]], fps);
            if (win1) {
              o.setattr("anistate", 0);
            }
            break;
        }
      }
    },
    I_zh_lose_bg: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/room/zh_lose_bg.png",
      uiw: 1300,
      uih: 250,
      xto: -650,
      yto: -65
    },
    I_zh_lose_left: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/room/zh_lose_left.png",
      uiw: 154,
      uih: 70,
      xto: -230,
      yto: -50,
      dopen: true,
      delayconfig: { open: 800 },
      translateX: -500,
      anistate: 1,
      aniconfig: function(o, fps) {
        switch (o.anistate) {
          case 0:
            break;
          case 1:
            let win1 = o.transition([["translateX", -500, 0, 800]], fps);
            if (win1) {
              o.setattr("anistate", 0);
            }
            break;
        }
      }
    },
    I_zh_lose_right: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/room/zh_lose_right.png",
      uiw: 121,
      uih: 55,
      xto: 110,
      yto: 60,
      dopen: true,
      delayconfig: { open: 800 },
      translateX: 500,
      anistate: 1,
      aniconfig: function(o, fps) {
        switch (o.anistate) {
          case 0:
            break;
          case 1:
            let win1 = o.transition([["translateX", 500, 0, 800]], fps);
            if (win1) {
              o.setattr("anistate", 0);
            }
            break;
        }
      }
    },
    I_result_bg: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/room/result_bg.png",
      uiw: 1318,
      uih: 708,
      xto: -659,
      yto: -320
    },
    A_zh_lose: {
      type: "ANIMATED",
      src: "../../../../assets/images/qzniu/room/zh_lose/zh_lose_",
      uiw: 610,
      uih: 320,
      xto: -305,
      yto: -160,
      length: 6,
      step: 200,
      doauto: false,
      scaling: 4,
      anistate: 1,
      aniconfig: function(o, fps) {
        switch (o.anistate) {
          case 0:
            break;
          case 1:
            let win1 = o.transition([["scaling", 4, 1, 800]], fps);
            if (win1) {
              o.setattr("anistate", 2);
              o.setattr("doauto", true);
            }
            break;
          case 2:
            if (o.currindex == 5) {
              o.setattr("anistate", 0);
              o.setattr("doauto", false);
            }
            break;
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
    }
  };

  public py0 = {
    I_py0_bg_01: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/room/playbg_01.png",
      uiw: 320,
      uih: 170,
      xto: -750,
      yto: 330
    },
    I_py0_bg_02: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/room/playbg_02.png",
      uiw: 340,
      uih: 190,
      xto: -760,
      yto: 320
    },
    I_py0_bg_03: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/room/playbg_03.png",
      uiw: 344,
      uih: 194,
      xto: -762,
      yto: 318
    },
    I_py0_face: {
      type: "IMG",
      src: "../../../../assets/images/common/head_imgs/face_0.png",
      uiw: 116,
      uih: 116,
      xto: -722,
      yto: 357
    },
    I_py0_much1: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/room/much_1.png",
      uiw: 130,
      uih: 64,
      xto: -150,
      yto: 180,
      event: true,
      eventdata: {
        click: function(serve, callback = null) {
          serve.STATE.player0.qz_times = 1;
          console.log("点击了1倍");
          callback && typeof callback == "function" && callback();
        }
      }
    },
    I_py0_much2: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/room/much_2.png",
      uiw: 130,
      uih: 64,
      xto: 20,
      yto: 180,
      event: true,
      eventdata: {
        click: function(serve, callback = null) {
          serve.STATE.player0.qz_times = 2;
          console.log("点击了2倍");
          callback && typeof callback == "function" && callback();
        }
      }
    },
    I_py0_much3: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/room/much_3.png",
      uiw: 130,
      uih: 64,
      xto: 190,
      yto: 180,
      event: true,
      eventdata: {
        click: function(serve, callback = null) {
          serve.STATE.player0.qz_times = 3;
          console.log("点击了3倍");
          callback && typeof callback == "function" && callback();
        }
      }
    },
    I_py0_much0: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/room/much_0.png",
      uiw: 130,
      uih: 64,
      xto: -320,
      yto: 180,
      event: true,
      eventdata: {
        click: function(serve, callback = null) {
          serve.STATE.player0.qz_times = 0;
          console.log("点击了不抢");
          callback && typeof callback == "function" && callback();
        }
      }
    },
    I_btn_bet_0: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/room/btn_bet_bg.png",
      uiw: 130,
      uih: 64,
      xto: -365,
      yto: 180,
      event: true,
      eventdata: {
        click: function(serve, callback = null) {
          serve.STATE.player0.xz_times = serve.CVDATA.I_btn_bet_0.store.value;
          console.log("点击了下注按钮0");
          callback && typeof callback == "function" && callback();
        }
      }
    },
    I_btn_bet_1: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/room/btn_bet_bg.png",
      uiw: 130,
      uih: 64,
      xto: -215,
      yto: 180,
      event: true,
      eventdata: {
        click: function(serve, callback = null) {
          serve.STATE.player0.xz_times = serve.CVDATA.I_btn_bet_1.store.value;
          console.log("点击了下注按钮1");
          callback && typeof callback == "function" && callback();
        }
      }
    },
    I_btn_bet_2: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/room/btn_bet_bg.png",
      uiw: 130,
      uih: 64,
      xto: -65,
      yto: 180,
      event: true,
      eventdata: {
        click: function(serve, callback = null) {
          serve.STATE.player0.xz_times = serve.CVDATA.I_btn_bet_2.store.value;
          console.log("点击了下注按钮2");
          callback && typeof callback == "function" && callback();
        }
      }
    },
    I_btn_bet_3: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/room/btn_bet_bg.png",
      uiw: 130,
      uih: 64,
      xto: 85,
      yto: 180,
      event: true,
      eventdata: {
        click: function(serve, callback = null) {
          serve.STATE.player0.xz_times = serve.CVDATA.I_btn_bet_3.store.value;
          console.log("点击了下注按钮3");
          callback && typeof callback == "function" && callback();
        }
      }
    },
    I_btn_bet_4: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/room/btn_bet_bg.png",
      uiw: 130,
      uih: 64,
      xto: 235,
      yto: 180,
      event: true,
      eventdata: {
        click: function(serve, callback = null) {
          serve.STATE.player0.xz_times = serve.CVDATA.I_btn_bet_4.store.value;
          console.log("点击了下注按钮4");
          callback && typeof callback == "function" && callback();
        }
      }
    },
    I_py0_err: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/room/playerr.png",
      uiw: 140,
      uih: 134,
      xto: 430,
      yto: 170,
      show: false,
    },
    I_py0_select0: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/room/btn_0.png",
      uiw: 188,
      uih: 78,
      xto: 400,
      yto: 430,
      event: true,
      eventdata: {
        click: function(serve, callback = null) {
          console.log("点击了没牛");
          // 音效
          Utils.FN.play_game_music(
            serve.Base.Music.game_music.doms,
            "../../../../assets/media/qzniu/carderror.mp3");

          serve.CVDATA.I_py0_err.show = true;
          serve.CVDATA.A_py0_sweat.show = true;

          callback && typeof callback == "function" && callback();
        }
      }
    },
    I_py0_select1: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/room/btn_1.png",
      uiw: 188,
      uih: 78,
      xto: 400,
      yto: 330,
      event: true,
      eventdata: {
        click: function(serve, callback = null) {
          console.log("点击了有牛");
          // 音效
          Utils.FN.play_game_music(
            serve.Base.Music.game_music.doms,
            "../../../../assets/media/qzniu/Great.mp3");
            
          serve.STATE.player0.animate = 10;
          callback && typeof callback == "function" && callback();
        }
      }
    },
    I_py0_niu_tip: {
      type: "IMG",
      // src: "../../../../assets/images/qzniu/room/result_niu_0.png",
      uiw: 377,
      uih: 113,
      xto: -186,
      yto: 196,
      scaling: 0.5,
      anistate: 1,
      aniconfig: function(o, fps) {
        switch (o.anistate) {
          case 0:
            break;
          case 1:
            let win1 = o.transition([["scaling", 0.5, 1.5, 500]], fps);
            win1 && (o.anistate = 2);
            break;
          case 2:
            let win2 = o.transition([["scaling", 1.5, 1, 300]], fps);
            win2 && (o.anistate = 0);
            break;
        }
      }
    },
    A_py0_sweat: {
      type: "ANIMATED",
      src: "../../../../assets/images/qzniu/room/sweat/sweat_",
      uiw: 22,
      uih: 60,
      xto: 525,
      yto: 210,
      length: 10,
      step: 200,
      show: false,
      animationce: true,
      doauto: true
    },
    A_py0_dot: {
      type: "ANIMATED",
      src: "../../../../assets/images/qzniu/room/dot/playdot1_",
      uiw: 335,
      uih: 186,
      xto: -758,
      yto: 322,
      length: 2,
      step: 200,
      doauto: true
    }
  };
  public py0_pkp = {
    I_py0_pkp_0: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/room/pkp/02b.png",
      uiw: 98,
      uih: 130,
      xto: -50,
      yto: 350,
      anistate: 1,
      aniconfig: function(o, fps) {
        switch (o.anistate) {
          case 0:
            break;
          case 1:
            let win1 = o.transition(
              [["xto", -50, -350, 500], ["scaling", 1, 1.5, 500]],
              fps
            );
            win1 && ((o.anistate = 0), (o.event = true));
            break;
          case 2:
            let win2 = o.transition(
              [
                ["xto", -350, -250, 200],
                ["yto", 350, 160, 200],
                ["scaling", 1.5, 1, 200]
              ],
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
      },
      eventdata: {
        click: function(serve, callback = null) {
          let ty = serve.CVDATA.I_py0_pkp_0;
          if (serve.Compute.active) {
            ty.translateY = ty.translateY == 0 ? -30 : 0;
          } else {
            ty.translateY == -30 && (ty.translateY = 0);
          }
          serve.compute_niu(serve);
          console.log(serve.Compute);
          callback && typeof callback == "function" && callback();
        }
      }
    },
    I_py0_pkp_1: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/room/pkp/12a.png",
      uiw: 98,
      uih: 130,
      xto: -50,
      yto: 350,
      anistate: 1,
      aniconfig: function(o, fps) {
        switch (o.anistate) {
          case 0:
            break;
          case 1:
            let win = o.transition(
              [["xto", -50, -200, 500], ["scaling", 1, 1.5, 500]],
              fps
            );
            win && ((o.anistate = 0), (o.event = true));
            break;
          case 2:
            let win2 = o.transition(
              [
                ["xto", -200, -150, 200],
                ["yto", 350, 160, 200],
                ["scaling", 1.5, 1, 200]
              ],
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
      },
      eventdata: {
        click: function(serve, callback = null) {
          let ty = serve.CVDATA.I_py0_pkp_1;
          if (serve.Compute.active) {
            ty.translateY = ty.translateY == 0 ? -30 : 0;
          } else {
            ty.translateY == -30 && (ty.translateY = 0);
          }
          serve.compute_niu(serve);
          callback && typeof callback == "function" && callback();
        }
      }
    },
    I_py0_pkp_2: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/room/pkp/08c.png",
      uiw: 98,
      uih: 130,
      xto: -50,
      yto: 350,
      anistate: 1,
      aniconfig: function(o, fps) {
        switch (o.anistate) {
          case 0:
            break;
          case 1:
            let win = o.transition([["scaling", 1, 1.5, 500]], fps);
            win && ((o.anistate = 0), (o.event = true));
            break;
          case 2:
            let win2 = o.transition(
              [["yto", 350, 160, 200], ["scaling", 1.5, 1, 200]],
              fps
            );
            if (win2) {
              o.setattr("anistate", -1);
              o.setattr("event", false);
              o.setattr("translateY", 0);
            }
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
      },
      eventdata: {
        click: function(serve, callback = null) {
          let ty = serve.CVDATA.I_py0_pkp_2;
          if (serve.Compute.active) {
            ty.translateY = ty.translateY == 0 ? -30 : 0;
          } else {
            ty.translateY == -30 && (ty.translateY = 0);
          }
          serve.compute_niu(serve);
          callback && typeof callback == "function" && callback();
        }
      }
    },
    I_py0_pkp_3: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/room/pkp/13d.png",
      uiw: 98,
      uih: 130,
      xto: -50,
      yto: 350,
      anistate: 1,
      aniconfig: function(o, fps) {
        switch (o.anistate) {
          case 0:
            break;
          case 1:
            let win = o.transition(
              [["xto", -50, 100, 500], ["scaling", 1, 1.5, 500]],
              fps
            );
            win && ((o.anistate = 0), (o.event = true));
            break;
          case 2:
            let win2 = o.transition(
              [
                ["xto", 100, 50, 200],
                ["yto", 350, 160, 200],
                ["scaling", 1.5, 1, 200]
              ],
              fps
            );
            if (win2) {
              o.setattr("anistate", -1);
              o.setattr("event", false);
              o.setattr("translateY", 0);
            }
            break;
          case 3:
            let win3 = o.transition([["xto", 50, -50, 400]], fps);
            win3 && (o.anistate = 0);
            break;
          case 4:
            let win4 = o.transition([["xto", -50, 0, 400]], fps);
            win4 && (o.anistate = 0);
            break;
        }
      },
      eventdata: {
        click: function(serve, callback = null) {
          let ty = serve.CVDATA.I_py0_pkp_3;
          if (serve.Compute.active) {
            ty.translateY = ty.translateY == 0 ? -30 : 0;
          } else {
            ty.translateY == -30 && (ty.translateY = 0);
          }
          serve.compute_niu(serve);
          callback && typeof callback == "function" && callback();
        }
      }
    },
    I_py0_pkp_4: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/room/pkp/12b.png",
      uiw: 98,
      uih: 130,
      xto: -50,
      yto: 350,
      anistate: 1,
      aniconfig: function(o, fps) {
        switch (o.anistate) {
          case 0:
            break;
          case 1:
            let win = o.transition(
              [["xto", -50, 250, 500], ["scaling", 1, 1.5, 500]],
              fps
            );
            win && ((o.anistate = 0), (o.event = true));
            break;
          case 2:
            let win2 = o.transition(
              [
                ["xto", 250, 150, 200],
                ["yto", 350, 160, 200],
                ["scaling", 1.5, 1, 200]
              ],
              fps
            );
            if (win2) {
              o.setattr("anistate", -1);
              o.setattr("event", false);
              o.setattr("translateY", 0);
            }
            // win2 && ((o.anistate = -1), (o.event = false));
            break;
          case 3:
            let win3 = o.transition([["xto", 150, -50, 400]], fps);
            win3 && (o.anistate = 0);
            break;
          case 4:
            let win4 = o.transition([["xto", -50, 40, 400]], fps);
            win4 && (o.anistate = 0);
            break;
        }
      },
      eventdata: {
        click: function(serve, callback = null) {
          let ty = serve.CVDATA.I_py0_pkp_4;
          if (serve.Compute.active) {
            ty.translateY = ty.translateY == 0 ? -30 : 0;
          } else {
            ty.translateY == -30 && (ty.translateY = 0);
          }
          serve.compute_niu(serve);
          callback && typeof callback == "function" && callback();
        }
      }
    }
  };

  public py1 = {
    I_py1_bg_01: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/room/playbg_11.png",
      uiw: 170,
      uih: 220,
      xto: 650,
      yto: -80
    },
    I_py1_bg_02: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/room/playbg_12.png",
      uiw: 190,
      uih: 240,
      xto: 640,
      yto: -90
    },
    I_py1_bg_03: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/room/playbg_13.png",
      uiw: 194,
      uih: 244,
      xto: 638,
      yto: -92
    },
    I_py1_face: {
      type: "IMG",
      src: "../../../../assets/images/common/head_imgs/face_0.png",
      uiw: 116,
      uih: 116,
      xto: 677,
      yto: -28
    },
    I_py1_niu_tip: {
      type: "IMG",
      // src: "../../../../assets/images/qzniu/room/result_niu_10.png",
      uiw: 377,
      uih: 113,
      xto: 300,
      yto: -24,
      scaling: 0.5,
      anistate: 1,
      aniconfig: function(o, fps) {
        switch (o.anistate) {
          case 0:
            break;
          case 1:
            let win1 = o.transition([["scaling", 0.5, 1.5, 500]], fps);
            win1 && (o.anistate = 2);
            break;
          case 2:
            let win2 = o.transition([["scaling", 1.5, 1, 300]], fps);
            win2 && (o.anistate = 0);
            break;
        }
      }
    },
    A_py1_dot: {
      type: "ANIMATED",
      src: "../../../../assets/images/qzniu/room/dot/playdot2_",
      uiw: 185,
      uih: 235,
      xto: 642,
      yto: -88,
      length: 2,
      step: 200,
      doauto: true
    }
  };
  public py1_pkp = {
    I_py1_pkp_0: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/room/pkp/back.png",
      uiw: 98,
      uih: 130,
      xto: 526,
      yto: -60,
      anistate: 1,
      aniconfig: function(o, fps) {
        switch (o.anistate) {
          case 0:
            break;
          case 1:
            let win = o.transition([["xto", 526, 346, 400]], fps);
            win && (o.anistate = 0);
            break;
          default:
            break;
        }
      }
    },
    I_py1_pkp_1: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/room/pkp/back.png",
      uiw: 98,
      uih: 130,
      xto: 526,
      yto: -60,
      anistate: 1,
      aniconfig: function(o, fps) {
        switch (o.anistate) {
          case 0:
            break;
          case 1:
            let win = o.transition([["xto", 526, 386, 400]], fps);
            win && (o.anistate = 0);
            break;
          default:
            break;
        }
      }
    },
    I_py1_pkp_2: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/room/pkp/back.png",
      uiw: 98,
      uih: 130,
      xto: 526,
      yto: -60,
      anistate: 1,
      aniconfig: function(o, fps) {
        switch (o.anistate) {
          case 0:
            break;
          case 1:
            let win = o.transition([["xto", 526, 426, 400]], fps);
            win && (o.anistate = 0);
            break;
          default:
            break;
        }
      }
    },
    I_py1_pkp_3: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/room/pkp/back.png",
      uiw: 98,
      uih: 130,
      xto: 526,
      yto: -60,
      anistate: 1,
      aniconfig: function(o, fps) {
        switch (o.anistate) {
          case 0:
            break;
          case 1:
            let win = o.transition([["xto", 526, 486, 400]], fps);
            win && (o.anistate = 0);
            break;
          default:
            break;
        }
      }
    },
    I_py1_pkp_4: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/room/pkp/back.png",
      uiw: 98,
      uih: 130,
      xto: 526,
      yto: -60,
      anistate: 1,
      aniconfig: function(o, fps) {
        switch (o.anistate) {
          case 0:
            break;
          case 1:
            let win = o.transition([["xto", 526, 526, 400]], fps);
            win && (o.anistate = 0);
            break;
          default:
            break;
        }
      }
    }
  };

  public py2 = {
    I_py2_bg_01: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/room/playbg_01.png",
      uiw: 320,
      uih: 170,
      xto: -160,
      yto: -390
    },
    I_py2_bg_02: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/room/playbg_02.png",
      uiw: 340,
      uih: 190,
      xto: -170,
      yto: -400
    },
    I_py2_bg_03: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/room/playbg_03.png",
      uiw: 344,
      uih: 194,
      xto: -172,
      yto: -402
    },
    I_py2_face: {
      type: "IMG",
      src: "../../../../assets/images/common/head_imgs/face_0.png",
      uiw: 116,
      uih: 116,
      xto: -132,
      yto: -363
    },
    I_py2_niu_tip: {
      type: "IMG",
      // src: "../../../../assets/images/qzniu/room/result_niu_13.png",
      uiw: 377,
      uih: 113,
      xto: -188,
      yto: -164,
      scaling: 0.5,
      anistate: 1,
      aniconfig: function(o, fps) {
        switch (o.anistate) {
          case 0:
            break;
          case 1:
            let win1 = o.transition([["scaling", 0.5, 1.5, 500]], fps);
            win1 && (o.anistate = 2);
            break;
          case 2:
            let win2 = o.transition([["scaling", 1.5, 1, 300]], fps);
            win2 && (o.anistate = 0);
            break;
        }
      }
    },
    A_py2_dot: {
      type: "ANIMATED",
      src: "../../../../assets/images/qzniu/room/dot/playdot1_",
      uiw: 335,
      uih: 186,
      xto: -168,
      yto: -398,
      length: 2,
      step: 200,
      doauto: true
    }
  };
  public py2_pkp = {
    I_py2_pkp_0: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/room/pkp/back.png",
      uiw: 98,
      uih: 130,
      xto: -50,
      yto: -200,
      anistate: 1,
      aniconfig: function(o, fps) {
        switch (o.anistate) {
          case 0:
            break;
          case 1:
            let win = o.transition([["xto", -50, -140, 400]], fps);
            win && (o.anistate = 0);
            break;
          default:
            break;
        }
      }
    },
    I_py2_pkp_1: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/room/pkp/back.png",
      uiw: 98,
      uih: 130,
      xto: -50,
      yto: -200,
      anistate: 1,
      aniconfig: function(o, fps) {
        switch (o.anistate) {
          case 0:
            break;
          case 1:
            let win = o.transition([["xto", -50, -100, 400]], fps);
            win && (o.anistate = 0);
            break;
          default:
            break;
        }
      }
    },
    I_py2_pkp_2: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/room/pkp/back.png",
      uiw: 98,
      uih: 130,
      xto: -50,
      yto: -200,
      anistate: 1,
      aniconfig: function(o, fps) {
        switch (o.anistate) {
          case 0:
            break;
          case 1:
            let win = o.transition([["xto", -50, -60, 400]], fps);
            win && (o.anistate = 0);
            break;
          default:
            break;
        }
      }
    },
    I_py2_pkp_3: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/room/pkp/back.png",
      uiw: 98,
      uih: 130,
      xto: -50,
      yto: -200,
      anistate: 1,
      aniconfig: function(o, fps) {
        switch (o.anistate) {
          case 0:
            break;
          case 1:
            let win = o.transition([["xto", -50, 0, 400]], fps);
            win && (o.anistate = 0);
            break;
          default:
            break;
        }
      }
    },
    I_py2_pkp_4: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/room/pkp/back.png",
      uiw: 98,
      uih: 130,
      xto: -50,
      yto: -200,
      anistate: 1,
      aniconfig: function(o, fps) {
        switch (o.anistate) {
          case 0:
            break;
          case 1:
            let win = o.transition([["xto", -50, 40, 400]], fps);
            win && (o.anistate = 0);
            break;
          default:
            break;
        }
      }
    }
  };

  public py3 = {
    I_py3_bg_01: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/room/playbg_11.png",
      uiw: 170,
      uih: 220,
      xto: -820,
      yto: -80
    },
    I_py3_bg_02: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/room/playbg_12.png",
      uiw: 190,
      uih: 240,
      xto: -830,
      yto: -90
    },
    I_py3_bg_03: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/room/playbg_13.png",
      uiw: 194,
      uih: 244,
      xto: -832,
      yto: -92
    },
    I_py3_face: {
      type: "IMG",
      src: "../../../../assets/images/common/head_imgs/face_0.png",
      uiw: 116,
      uih: 116,
      xto: -793,
      yto: -28
    },
    I_py3_niu_tip: {
      type: "IMG",
      // src: "../../../../assets/images/qzniu/room/result_niu_7.png",
      uiw: 377,
      uih: 113,
      xto: -672,
      yto: -24,
      scaling: 0.5,
      anistate: 1,
      aniconfig: function(o, fps) {
        switch (o.anistate) {
          case 0:
            break;
          case 1:
            let win1 = o.transition([["scaling", 0.5, 1.5, 500]], fps);
            win1 && (o.anistate = 2);
            break;
          case 2:
            let win2 = o.transition([["scaling", 1.5, 1, 300]], fps);
            win2 && (o.anistate = 0);
            break;
        }
      }
    },
    A_py3_dot: {
      type: "ANIMATED",
      src: "../../../../assets/images/qzniu/room/dot/playdot2_",
      uiw: 185,
      uih: 235,
      xto: -828,
      yto: -88,
      length: 2,
      step: 200,
      doauto: true
    }
  };
  public py3_pkp = {
    I_py3_pkp_0: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/room/pkp/back.png",
      uiw: 98,
      uih: 130,
      xto: -624,
      yto: -60,
      anistate: 1,
      aniconfig: function(o, fps) {
        switch (o.anistate) {
          case 0:
            break;
          case 1:
            let win = o.transition([["xto", -624, -624, 400]], fps);
            win && (o.anistate = 0);
            break;
          default:
            break;
        }
      }
    },
    I_py3_pkp_1: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/room/pkp/back.png",
      uiw: 98,
      uih: 130,
      xto: -624,
      yto: -60,
      anistate: 1,
      aniconfig: function(o, fps) {
        switch (o.anistate) {
          case 0:
            break;
          case 1:
            let win = o.transition([["xto", -624, -584, 400]], fps);
            win && (o.anistate = 0);
            break;
          default:
            break;
        }
      }
    },
    I_py3_pkp_2: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/room/pkp/back.png",
      uiw: 98,
      uih: 130,
      xto: -624,
      yto: -60,
      anistate: 1,
      aniconfig: function(o, fps) {
        switch (o.anistate) {
          case 0:
            break;
          case 1:
            let win = o.transition([["xto", -624, -544, 400]], fps);
            win && (o.anistate = 0);
            break;
          default:
            break;
        }
      }
    },
    I_py3_pkp_3: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/room/pkp/back.png",
      uiw: 98,
      uih: 130,
      xto: -624,
      yto: -60,
      anistate: 1,
      aniconfig: function(o, fps) {
        switch (o.anistate) {
          case 0:
            break;
          case 1:
            let win = o.transition([["xto", -624, -484, 400]], fps);
            win && (o.anistate = 0);
            break;
          default:
            break;
        }
      }
    },
    I_py3_pkp_4: {
      type: "IMG",
      src: "../../../../assets/images/qzniu/room/pkp/back.png",
      uiw: 98,
      uih: 130,
      xto: -624,
      yto: -60,
      anistate: 1,
      aniconfig: function(o, fps) {
        switch (o.anistate) {
          case 0:
            break;
          case 1:
            let win = o.transition([["xto", -624, -444, 400]], fps);
            win && (o.anistate = 0);
            break;
          default:
            break;
        }
      }
    }
  };



  // 扑克牌点击交互事件
  public compute_niu(sever) {
    let _that = sever;
    let pknames = _that.PkpGroup.player0.pkname;
    let comt = _that.Compute;
    comt.data = [];
    comt.add = "";
    comt.active = true;

    for (let i = 0; i < pknames.length; i++) {
      let item = _that.CVDATA[pknames[i]];
      if (item.translateY == -30) {
        _that.Compute.data.push(item.store.value);
      }
    }
    if (comt.data.length >= 3) {
      comt.add = comt.data.reduce((a, b) => a + b);
      comt.active = false;
    }
  }
}
