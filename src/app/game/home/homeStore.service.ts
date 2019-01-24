import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BaseService } from "../../services/base.service";
import { Utils } from "../../factory/utils.js";

@Injectable()
export class HomeService {
  constructor(public Base: BaseService, private router: Router) {}

  public CW; // 画布宽度
  public CH; // 画布高度
  public CS; // 画布缩放比例
  public STATE: number = 0; // 当前画布绘制状态
  public EVENT = []; // 存储当前页面有事件绑定的区域坐标
  public FPS = 100; // 屏幕绘制帧率
  public DELAY = 0; // 服务器延迟时间 ms
  public CountDown: number = 0; //倒计时时间 不等于0时会自动倒计时 s

  public CVDATA = {};
  public initiate = {
    // 图片
    I_top_left_bg: {
      type: "IMG",
      src: "../../../assets/images/home/dt_01.png",
      uiw: 584,
      uih: 140,
      xtl: 0,
      ytt: 0
    },
    I_top_left_userface: {
      type: "IMG",
      src: "../../../assets/images/home/dt_00.png",
      uiw: 110,
      uih: 110,
      xtl: 20,
      ytt: 10
    },
    I_top_left_linbg: {
      type: "IMG",
      src: "../../../assets/images/home/dt_02.png",
      uiw: 303,
      uih: 48,
      xtl: 150,
      ytt: 70
    },
    I_top_left_rest: {
      type: "IMG",
      src: "../../../assets/images/home/dt_04.png",
      uiw: 48,
      uih: 48,
      xtl: 410,
      ytt: 68,
      shape: "circle",
      aniconfig: function(o, fps) {
        switch (o.anistate) {
          case 0:
            break;

          case 1:
            o.rotate += (72 * fps) / 100;
            if (o.rotate >= 360) {
              o.rotate = 0;
              o.anistate = 0;
            }
        }
      },
      event: true,
      eventdata: {
        click: function(serve, callback = null) {
          serve.CVDATA.I_top_left_rest.anistate = 1;
          console.log("点击了刷新余额");
          callback && typeof callback == "function" && callback();
        }
      }
    },
    I_top_right_out: {
      type: "IMG",
      src: "../../../assets/images/home/dt_08.png",
      uiw: 68,
      uih: 110,
      xtr: 114,
      ytt: 20,
      event: true,
      eventdata: {
        click: function(serve, callback = null) {
          console.log("点击了退出");
          callback && typeof callback == "function" && callback();
        }
      }
    },
    I_top_right_set: {
      type: "IMG",
      src: "../../../assets/images/home/dt_07.png",
      uiw: 68,
      uih: 110,
      xtr: 228,
      ytt: 20,
      event: true,
      eventdata: {
        click: function(serve, callback = null) {
          serve.Base.Popup_Page = 1;
          console.log("点击了设置");
          callback && typeof callback == "function" && callback();
        }
      }
    },
    I_top_right_emal: {
      type: "IMG",
      src: "../../../assets/images/home/dt_06.png",
      uiw: 68,
      uih: 110,
      xtr: 342,
      ytt: 20,
      event: true,
      eventdata: {
        click: function(serve, callback = null) {
          serve.Base.Popup_Page = 3;
          console.log("点击了邮件");
          callback && typeof callback == "function" && callback();
        }
      }
    },
    I_top_right_rule: {
      type: "IMG",
      src: "../../../assets/images/home/dt_05.png",
      uiw: 68,
      uih: 110,
      xtr: 456,
      ytt: 20,
      event: true,
      eventdata: {
        click: function(serve, callback = null) {
          serve.Base.Popup_Page = 2;
          console.log("点击了规则");
          callback && typeof callback == "function" && callback();
        }
      }
    },
    I_bottom_left_bg: {
      type: "IMG",
      src: "../../../assets/images/home/dt_40.png",
      uiw: 1219,
      uih: 130,
      xtl: 0,
      ytb: 130
    },

    I_bottom_right_store: {
      type: "IMG",
      src: "../../../assets/images/home/dt_53.png",
      uiw: 284,
      uih: 86,
      xtr: 300,
      ytb: 100,
      event: true,
      eventdata: {
        click: function(serve, callback = null) {
          serve.router.navigate(["index"]);
          console.log("点击了商城");
          callback && typeof callback == "function" && callback();
        }
      }
    },
    I_bottom_left_sline: {
      type: "IMG",
      src: "../../../assets/images/home/dt_51.png",
      uiw: 4,
      uih: 64,
      xtl: 240,
      ytb: 100
    },
    I_bottom_left_service: {
      type: "IMG",
      src: "../../../assets/images/home/dt_41.png",
      uiw: 177,
      uih: 90,
      xtl: 30,
      ytb: 100,
      event: true,
      eventdata: {
        click: function(serve, callback = null) {
          console.log("点击了客服");
          callback && typeof callback == "function" && callback();
        }
      }
    },
    I_bottom_left_sign: {
      type: "IMG",
      src: "../../../assets/images/home/dt_43.png",
      uiw: 159,
      uih: 76,
      xtl: 256,
      ytb: 92,
      event: true,
      eventdata: {
        click: function(serve, callback = null) {
          console.log("点击了签到");
          callback && typeof callback == "function" && callback();
        }
      }
    },
    I_bottom_left_sore: {
      type: "IMG",
      src: "../../../assets/images/home/dt_45.png",
      uiw: 177,
      uih: 83,
      xtl: 467,
      ytb: 96,
      event: true,
      eventdata: {
        click: function(serve, callback = null) {
          console.log("点击了战绩");
          callback && typeof callback == "function" && callback();
        }
      }
    },
    I_bottom_left_activity: {
      type: "IMG",
      src: "../../../assets/images/home/dt_47.png",
      uiw: 167,
      uih: 82,
      xtl: 696,
      ytb: 98,
      event: true,
      eventdata: {
        click: function(serve, callback = null) {
          console.log("点击了活动");
          callback && typeof callback == "function" && callback();
        }
      }
    },
    I_bottom_left_feadbk: {
      type: "IMG",
      src: "../../../assets/images/home/dt_49.png",
      uiw: 169,
      uih: 82,
      xtl: 911,
      ytb: 98,
      event: true,
      eventdata: {
        click: function(serve, callback = null) {
          console.log("点击了反馈");
          callback && typeof callback == "function" && callback();
        }
      }
    },

    I_game_man: {
      type: "IMG",
      src: "../../../assets/images/home/dt_12.png",
      uiw: 20,
      uih: 23,
      xto: -678,
      yto: 316
    },
    I_game_qzniu_bg: {
      type: "IMG",
      src: "../../../assets/images/home/dt_09.png",
      uiw: 420,
      uih: 713,
      xto: -840,
      yto: -338,
      padding:18,
      event: true,
      eventdata: {
        click: function(serve, callback = null) {
          serve.router.navigate(["game/qzniu"]);
          callback && typeof callback == "function" && callback();
        }
      }
    },
    I_game_qzniu_icon: {
      type: "IMG",
      src: "../../../assets/images/home/dt_10.png",
      uiw: 424,
      uih: 593,
      xto: -840,
      yto: -368
    },
    I_game_qzniu_font: {
      type: "IMG",
      src: "../../../assets/images/home/dt_11.png",
      uiw: 244,
      uih: 65,
      xto: -750,
      yto: 230
    },

    I_game_jinhua_bg: {
      type: "IMG",
      src: "../../../assets/images/home/dt_20.png",
      uiw: 350,
      uih: 350,
      xto: -372,
      yto: -338,
      event: true,
      eventdata: {
        click: function(serve, callback = null) {
          console.log("点击了扎金花");
          callback && typeof callback == "function" && callback();
        }
      }
    },
    I_game_jinhua_font: {
      type: "IMG",
      src: "../../../assets/images/home/dt_21.png",
      uiw: 132,
      uih: 48,
      xto: -346,
      yto: -65
    },

    I_game_doudz_bg: {
      type: "IMG",
      src: "../../../assets/images/home/dt_22.png",
      uiw: 350,
      uih: 350,
      xto: 27,
      yto: -338,
      event: true,
      eventdata: {
        click: function(serve, callback = null) {
          console.log("点击了斗地主");
          callback && typeof callback == "function" && callback();
        }
      }
    },
    I_game_doudz_font: {
      type: "IMG",
      src: "../../../assets/images/home/dt_23.png",
      uiw: 132,
      uih: 48,
      xto: 53,
      yto: -65
    },

    I_game_dzpk_bg: {
      type: "IMG",
      src: "../../../assets/images/home/dt_24.png",
      uiw: 350,
      uih: 350,
      xto: 428,
      yto: -338,
      event: true,
      eventdata: {
        click: function(serve, callback = null) {
          console.log("点击了德州扑克");
          callback && typeof callback == "function" && callback();
        }
      }
    },
    I_game_dzpk_font: {
      type: "IMG",
      src: "../../../assets/images/home/dt_25.png",
      uiw: 174,
      uih: 48,
      xto: 454,
      yto: -65
    },

    I_game_sang_bg: {
      type: "IMG",
      src: "../../../assets/images/home/dt_26.png",
      uiw: 350,
      uih: 363,
      xto: -372,
      yto: 12,
      event: true,
      eventdata: {
        click: function(serve, callback = null) {
          console.log("点击了三公");
          callback && typeof callback == "function" && callback();
        }
      }
    },
    I_game_sang_font: {
      type: "IMG",
      src: "../../../assets/images/home/dt_27.png",
      uiw: 102,
      uih: 52,
      xto: -346,
      yto: 282
    },

    I_game_maj_bg: {
      type: "IMG",
      src: "../../../assets/images/home/dt_28.png",
      uiw: 350,
      uih: 363,
      xto: 27,
      yto: 12,
      event: true,
      eventdata: {
        click: function(serve, callback = null) {
          console.log("点击了麻将");
          callback && typeof callback == "function" && callback();
        }
      }
    },
    I_game_maj_font: {
      type: "IMG",
      src: "../../../assets/images/home/dt_29.png",
      uiw: 102,
      uih: 54,
      xto: 53,
      yto: 282
    },

    I_game_bjl_bg: {
      type: "IMG",
      src: "../../../assets/images/home/dt_30.png",
      uiw: 350,
      uih: 363,
      xto: 428,
      yto: 12,
      event: true,
      eventdata: {
        click: function(serve, callback = null) {
          console.log("点击了百家乐");
          callback && typeof callback == "function" && callback();
        }
      }
    },
    I_game_bjl_font: {
      type: "IMG",
      src: "../../../assets/images/home/dt_31.png",
      uiw: 149,
      uih: 54,
      xto: 454,
      yto: 282
    },

    // 动画
    A_top_coin: {
      type: "ANIMATED",
      src: "../../../assets/images/common/coin/coin_",
      uiw: 58,
      uih: 58,
      xtl: 146,
      ytt: 60,
      length: 8,
      step: 200,
      currindex: 0,
      doauto: true
    },
    A_top_meteor: {
      type: "ANIMATED",
      src: "../../../assets/images/home/meteor/meteor_",
      uiw: 359,
      uih: 343,
      xto: -50,
      ytt: 0,
      length: 12,
      step: 100,
      currindex: 0,
      doauto: true,
      danimate: true,
      danimateconfig: [100, 5000]
    },
    A_top_meteor_db: {
      type: "ANIMATED",
      src: "../../../assets/images/home/meteor/meteor_",
      uiw: 359,
      uih: 343,
      xto: -300,
      ytt: 0,
      length: 12,
      step: 100,
      currindex: 0,
      doauto: true,
      danimate: true,
      danimateconfig: [1000, 6000]
    },
    A_game_qzniu_line: {
      type: "ANIMATED",
      src: "../../../assets/images/home/bigoutline/lineb_",
      uiw: 420,
      uih: 713,
      xto: -840,
      yto: -338,
      length: 12,
      step: 200,
      currindex: 0,
      doauto: true
    },
    A_game_public_line: {
      type: "ANIMATED",
      src: "../../../assets/images/home/publine/lines_",
      uiw: 350,
      uih: 350,
      xto: -372,
      yto: -338,
      length: 11,
      step: 200,
      currindex: 0,
      doauto: true
    },

    A_game_star: {
      type: "ANIMATED",
      src: "../../../assets/images/common/star/star_",
      uiw: 350,
      uih: 380,
      xto: -372,
      yto: -338,
      length: 10,
      step: 200,
      currindex: 0,
      doauto: true,
      danimate: true,
      danimateconfig: [1000, 3000]
    },
    A_game_star_small: {
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
  };
}
