import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BaseService } from "../../services/base.service";
import { Utils } from "../../factory/utils.js";

@Injectable()
export class KyserviceService {

  constructor(public Base: BaseService, private router: Router) {}

  public CW; // 画布宽度
  public CH; // 画布高度
  public CS; // 画布缩放比例
  public STATE: number = 0; // 当前画布绘制状态
  public EVENT = []; // 存储当前页面有事件绑定的区域坐标
  public FPS = 100; // 屏幕绘制帧率
  public DELAY = 0; // 服务器延迟时间 ms
  public CountDown:number = 0; //倒计时时间 不等于0时会自动倒计时 s

  public CVDATA ={};
  public initiate = {

    // img data  属性名以 'I_' 开头
    I_top_log: {
      type: 'IMG',
      src: "../../../assets/images/kyqp/game_qiangniu/logo.png",
      uiw: 377,
      uih: 108,
      xtl: 0,
      ytt: 0,
      // dopen:true,
      // dclose:true,
      // delayconfig:{
      //   open: [1000,10000],
      //   close: [1000,10000],
      // }

    },
    I_top_money: {
      type: 'IMG',
      src: "../../../assets/images/kyqp/game_qiangniu/money.png",
      uiw: 53,
      uih: 38,
      xtl: 450,
      ytt: 40,
    },
    I_top_set: {
      type: 'IMG',
      src: "../../../assets/images/kyqp/game_qiangniu/set.png",
      uiw: 40,
      uih: 40,
      xtr: 200,
      ytt: 28,
      event: true,
      eventdata: {
        type: 'IMG',
        click: function(serve, callback = null) {
          callback && typeof callback == "function" && callback();
        }
      }
    },
    I_top_extend: {
      type: 'IMG',
      src: "../../../assets/images/kyqp/game_qiangniu/extend.png",
      uiw: 40,
      uih: 40,
      xtr: 280,
      ytt: 28,
      event: true,
      eventdata: {
        click: function(serve, callback = null) {
          Utils.FN.FullScreen(); // 全屏
          Utils.FN.SetDisplay(serve.CVDATA.I_top_extend, false); // 关闭全屏图标
          Utils.FN.SetDisplay(serve.CVDATA.I_top_shrink); // 开启缩小图标
          callback && typeof callback == "function" && callback();
        }
      }
    },
    I_top_shrink: {
      type: 'IMG',
      src: "../../../assets/images/kyqp/game_qiangniu/shrink.png",
      uiw: 40,
      uih: 40,
      xtr: 260,
      ytt: 28,
      event: true,
      show: false,
      eventdata: {
        click: function(serve, callback = null) {
          Utils.FN.ExitFull(); // 退出全屏
          Utils.FN.SetDisplay(serve.CVDATA.I_top_extend); // 开启全屏图标
          Utils.FN.SetDisplay(serve.CVDATA.I_top_shrink, false); // 关闭缩小图标
          callback && typeof callback == "function" && callback();
        }
      }
    },
    I_tip_bg: {
      type: 'IMG',
      src: "../../../assets/images/kyqp/game_qiangniu/tip_bg.png",
      uiw: 1146,
      uih: 41,
      xto: -573,
      ytt: 140
    },
    I_tip_bell: {
      type: 'IMG',
      src: "../../../assets/images/kyqp/game_qiangniu/tip_bell.png",
      uiw: 55,
      uih: 55,
      xto: -590,
      ytt: 140
    },
    I_icon_man: {
      type: 'IMG',
      src: "../../../assets/images/kyqp/game_qiangniu/man.png",
      uiw: 14,
      uih: 14,
      xto: -380,
      yto: 250,
    },


    // animated data  属性名以 'A_' 开头
    A_loging: {
      type: 'ANIMATED',
      src: "../../../assets/images/kyqp/game_qiangniu/loading/loading_",
      uiw: 172,
      uih: 172,
      xto: -86,
      yto: -86,
      length: 7,
      step: 200,
      doauto: true,
      show: false
    },

    A_top_delay: {
      type: 'ANIMATED',
      src: "../../../assets/images/kyqp/game_qiangniu/delay/delay_",
      uiw: 32,
      uih: 30,
      xtr: 120,
      ytt: 35,
      length: 6,
      step: 1000,
      currindex: 0,
      doauto: true,
      // aniconfig: (o,fps) => {
      //   o.currindex = 2;
      // }
    },

    A_qiangniu_bg: {
      type: 'ANIMATED',
      src: "../../../assets/images/kyqp/game_qiangniu/qzniu/qz_bg_",
      uiw: 289,
      uih: 439,
      xto: -600,
      yto: -156,
      length: 14,
      step: 200,
      doauto: true,
      event: true,
      eventdata: {
        click: function(serve, callback = null) {
          serve.router.navigate(["game"]);
          callback && typeof callback == "function" && callback();
        }
      }
    },
    A_qiangniu_icon: {
      type: 'ANIMATED',
      src: "../../../assets/images/kyqp/game_qiangniu/qzniu/qniu_",
      uiw: 365,
      uih: 455,
      xto: -638,
      yto: -148,
      length: 18,
      step: 200,
      doauto: true
    },
    A_qiangniu_star: {
      type: 'ANIMATED',
      src: "../../../assets/images/kyqp/game_qiangniu/qzniu/star_",
      uiw: 277,
      uih: 124,
      xto: -584,
      yto: 166,
      length: 8,
      step: 200,
      doauto: true
    },

    A_jinhua_bg: {
      type: 'ANIMATED',
      src: "../../../assets/images/kyqp/game_qiangniu/jinhua/jinhua_bg_",
      uiw: 240,
      uih: 240,
      xto: -300,
      yto: -178,
      length: 9,
      step: 200,
      doauto: true,
      shape: 'circle',
      padding: 16,
      event: true,
      eventdata: {
        click: function(serve, callback = null) {
          // console.log("feeerwr");
          serve.STATE = 1;
          serve.CountDown = 15;
          // Utils.FN.SetDisplay(serve.CVDATA.A_loging); // 显示loging
          callback && typeof callback == "function" && callback();
        }
      }
    },
    A_jinhua_icon: {
      type: 'ANIMATED',
      src: "../../../assets/images/kyqp/game_qiangniu/jinhua/jinhua_icon_",
      uiw: 240,
      uih: 240,
      xto: -300,
      yto: -178,
      length: 9,
      step: 200,
      doauto: true,
    },

    A_erbag_bg: {
      type: 'ANIMATED',
      src: "../../../assets/images/kyqp/game_qiangniu/28gang/28g_bg_",
      uiw: 240,
      uih: 240,
      xto: -74,
      yto: -178,
      length: 9,
      step: 200,
      doauto: true,
      shape: 'circle',
      padding: 16,
      event: true,
      eventdata: {
        click: function(serve, callback = null) {
          callback && typeof callback == "function" && callback();
        }
      }
    },
    A_erbag_icon: {
      type: 'ANIMATED',
      src: "../../../assets/images/kyqp/game_qiangniu/28gang/28g_icon_",
      uiw: 240,
      uih: 240,
      xto: -74,
      yto: -178,
      length: 9,
      step: 200,
      doauto: true
    },

    A_sang_bg: {
      type: 'ANIMATED',
      src: "../../../assets/images/kyqp/game_qiangniu/sg/sg_bg_",
      uiw: 240,
      uih: 240,
      xto: 152,
      yto: -178,
      length: 9,
      step: 200,
      doauto: true,
      shape: 'circle',
      padding: 16,
      event: true,
      eventdata: {
        click: function(serve, callback = null) {
          callback && typeof callback == "function" && callback();
        }
      }
    },
    A_sang_icon: {
      type: 'ANIMATED',
      src: "../../../assets/images/kyqp/game_qiangniu/sg/sg_icon_",
      uiw: 240,
      uih: 240,
      xto: 152,
      yto: -178,
      length: 9,
      step: 200,
      doauto: true
    },

    A_doudz_bg: {
      type: 'ANIMATED',
      src: "../../../assets/images/kyqp/game_qiangniu/doudz/dou_bg_",
      uiw: 240,
      uih: 240,
      xto: 375,
      yto: -178,
      length: 9,
      step: 200,
      doauto: true,
      shape: 'circle',
      padding: 16,
      event: true,
      eventdata: {
        click: function(serve, callback = null) {
          callback && typeof callback == "function" && callback();
        }
      }
    },
    A_doudz_icon: {
      type: 'ANIMATED',
      src: "../../../assets/images/kyqp/game_qiangniu/doudz/dou_icon_",
      uiw: 240,
      uih: 240,
      xto: 375,
      yto: -178,
      length: 9,
      step: 200,
      doauto: true,
    },

    A_bjl_bg: {
      type: 'ANIMATED',
      src: "../../../assets/images/kyqp/game_qiangniu/bjl/bjl_bg_",
      uiw: 240,
      uih: 240,
      xto: -300,
      yto: 60,
      length: 9,
      step: 200,
      doauto: true,
      shape: 'circle',
      padding: 16,
      event: true,
      eventdata: {
        click: function(serve, callback = null) {
          callback && typeof callback == "function" && callback();
        }
      }
    },
    A_bjl_icon: {
      type: 'ANIMATED',
      src: "../../../assets/images/kyqp/game_qiangniu/bjl/bjl_icon_",
      uiw: 240,
      uih: 240,
      xto: -300,
      yto: 60,
      length: 9,
      step: 200,
      doauto: true,
    },

    A_eryi_bg: {
      type: 'ANIMATED',
      src: "../../../assets/images/kyqp/game_qiangniu/21d/21d_bg_",
      uiw: 240,
      uih: 240,
      xto: -74,
      yto: 60,
      length: 9,
      step: 200,
      doauto: true,
      shape: 'circle',
      padding: 16,
      event: true,
      eventdata: {
        click: function(serve, callback = null) {
          callback && typeof callback == "function" && callback();
        }
      }
    },
    A_eryi_icon: {
      type: 'ANIMATED',
      src: "../../../assets/images/kyqp/game_qiangniu/21d/21d_man_",
      uiw: 240,
      uih: 240,
      xto: -74,
      yto: 60,
      length: 9,
      step: 200,
      doauto: true
    },

    A_dzpk_bg: {
      type: 'ANIMATED',
      src: "../../../assets/images/kyqp/game_qiangniu/dzpk/dz_bg_",
      uiw: 240,
      uih: 240,
      xto: 152,
      yto: 60,
      length: 9,
      step: 200,
      doauto: true,
      shape: 'circle',
      padding: 16,
      event: true,
      eventdata: {
        click: function(serve, callback = null) {
          callback && typeof callback == "function" && callback();
        }
      }
    },
    A_dzpk_icon: {
      type: 'ANIMATED',
      src: "../../../assets/images/kyqp/game_qiangniu/dzpk/dz_icon_",
      uiw: 240,
      uih: 240,
      xto: 152,
      yto: 60,
      length: 9,
      step: 200,
      doauto: true
    },

    A_maj_bg: {
      type: 'ANIMATED',
      src: "../../../assets/images/kyqp/game_qiangniu/maj/maj_bg_",
      uiw: 240,
      uih: 240,
      xto: 375,
      yto: 60,
      length: 9,
      step: 200,
      doauto: true,
      shape: 'circle',
      padding: 16,
      event: true,
      eventdata: {
        click: function(serve, callback = null) {
          callback && typeof callback == "function" && callback();
        }
      }
    },
    A_maj_icon: {
      type: 'ANIMATED',
      src: "../../../assets/images/kyqp/game_qiangniu/maj/maj_icon_",
      uiw: 240,
      uih: 240,
      xto: 375,
      yto: 60,
      length: 9,
      step: 200,
      doauto: true
    },

    // font data   属性名以 'F_' 开头
    // 基本文字对象
    F_font: {
      type: 'FONT',
    },

    // 粗体
    F_font_wt: {
      type: 'FONT',
        wt: 'bold',
    },

    // 公告条文字
    F_top_tips: {
      type: 'FONT',
      c: "#F0DD0A",
      size: 16,
      xto: 530,
      ytt: 150,
      doauto: true,
      aniconfig: function(o,fps) {
        o.translateX -= 2*fps/100;
        if (
          Math.abs(o.translateX) >
          Math.abs(o.str.length * o.size + 1000)
        ) {
          o.translateX = 0;
        }
      }
    },

    // 中间定时器文字
    F_mid_timer: {
      type: 'FONT',
      c: "#F0DD0A",
      wt: 'bolder',
      size: 80,
      xto: -26,
      yto: -60,
      aniconfig: function(o,fps) {
        switch(o.anistate){
          case 0:
          o.size += 10*fps/100;
          o.translateX -= o.str.length*2;
          o.translateY -= o.str.length*2;
          o.anistate = o.size >= 120? 1 : 0;
          if (o.size >= 120) {
            o.anistate = 1;
          }
          break;

          case 1:
          o.size -= 30*fps/100;
          o.translateX += o.str.length*6;
          o.translateY += o.str.length*6;
          if(o.size <= 60){
            o.str = "";
            o.show = false;
            o.size = 80 ;
            o.anistate = 0;
            o.translateX = 0;
            o.translateY = 0;
          };
          break;

        }

      }
    },


    // graph data   属性名以 'G_' 开头
    G_test:{
      type: 'GRAPH',
      fill: true,
      xto: -100,
      yto: -200,
      uiw: 200,
      uih: 200,
      // rotate:45,
      shape: 'circle',
      doauto: true,
      aniconfig: function(o,fps){
        o.rotate +=1*fps/100;
        // o.rotate = o.rotate>=360 ? 0 : o.rotate;
        // o.translateX+=2;
      }
      // dclose: true,
      // delayconfig:{
      //   close:2000,
      // }
    }

  };
}
