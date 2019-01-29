import { Component, OnInit, ElementRef } from "@angular/core";

import { BaseService } from "../../services/base.service";
import { CreateObj, CVBASIC } from "../../factory/tcanvasobject";

import { WebsocketService } from "../../services/websocket.service";
import { HttpclientService } from "../../services/httpclient.service";
import { Utils } from "../../factory/utils.js";

import { HomeService } from "./homeStore.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  constructor(
    private el: ElementRef,
    public Base: BaseService,
    public Hst: HomeService,
    public WS: WebsocketService,
    public Http: HttpclientService
  ) {}

  public ctxele; // canvas元素
  public timer; // 绘制画面的计时器
  ngOnInit() {
    // 登录验证
    // console.log('hoime',this.Base.userinfo.token);
    // this.Http.post("http://172.16.101.10:7892/v1/get_user_authentication").subscribe(
    //   res => {
    //     console.log("66666666666666",res);
    //   }
    // );

    // 设置设计稿尺寸 初始窗口画布尺寸
    this.Base.uiwidth = 1920;
    this.Base.uiheight = 1080;
    this.Base.initWidow();

    // 初始化所有绘画数据
    this.Hst.CVDATA = {};

    // 初始化绘画数据
    Utils.FN.ObMaping(this.Hst.CVDATA, CreateObj(this.Hst.initiate));

    this.init();
  }

  ngAfterViewInit() {
    // 设置背景音乐
    Utils.FN.play_bg_music(this.Base.Music.bg_music.dom, "../../assets/media/home.mp3");
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  public init() {
    let computeScale = -1; // 监听窗口大小变化后的画布比例变化
    let computeState = -1; // 监听绘画状态变化
    const _that = this;

    // 初始化画布
    this.ctxele = this.el.nativeElement.querySelector("#canvas");
    const ctx = this.ctxele.getContext("2d");
    const HST = this.Hst;

    // 背景图
    const bg_1 = new Image();
    bg_1.src = "../../../assets/images/home/dt_bg.jpg";

    this.timer = setInterval(function() {
      HST.CW = _that.Base.canvasWidth; // 画布宽度
      HST.CH = _that.Base.canvasHeight; // 画布高度
      HST.CS = _that.Base.scale; // 画布缩放比例
      HST.EVENT = []; // 事件绑定坐标数据

      // 清理画布
      ctx.beginPath();
      ctx.clearRect(0, 0, HST.CW, HST.CH);
      ctx.closePath();

      ctx.drawImage(bg_1, 0, 0, HST.CW, HST.CH); // 绘制背景 宽度全屏的图片必须原生绘制

      switch (HST.STATE) {
        case 0:
          Utils.FN.DrawObj(ctx, HST, [
            "I_top_left_bg",
            "I_top_left_userface",
            "I_top_left_linbg",
            "A_top_coin",
            "I_top_rest",
            "I_top_rest_add",
            "I_top_right_out",
            "I_top_right_set",
            "I_top_right_emal",
            "I_top_right_rule",
            "A_top_meteor",
            "A_top_meteor_db",
            "I_bottom_left_bg",
            "I_bottom_left_service",
            "I_bottom_left_sign",
            "I_bottom_left_sore",
            "I_bottom_left_activity",
            "I_bottom_left_feadbk",
            "I_bottom_right_store"
          ]);
          Utils.FN.DrawObj(ctx, HST, ["I_bottom_left_sline"], {
            xtl: 228,
            ytb: 86
          });
          Utils.FN.DrawObj(ctx, HST, ["I_bottom_left_sline"], {
            xtl: 439,
            ytb: 86
          });
          Utils.FN.DrawObj(ctx, HST, ["I_bottom_left_sline"], {
            xtl: 668,
            ytb: 86
          });
          Utils.FN.DrawObj(ctx, HST, ["I_bottom_left_sline"], {
            xtl: 887,
            ytb: 86
          });

          Utils.FN.DrawObj(ctx, HST, ["F_font_wt"], {
            str: _that.Base.userinfo.nick_name,
            xtl: 160,
            ytt: 12,
            size: 30,
            color: "#FFFFFF"
          });
          Utils.FN.DrawObj(ctx, HST, ["F_font"], {
            str: _that.Base.userinfo.balance,
            xtl: 216,
            ytt: 78,
            size: 24,
            color: "#FFBA00"
          });

          // 抢庄牛牛
          Utils.FN.DrawObj(ctx, HST, [
            "I_game_qzniu_bg",
            "A_game_qzniu_line",
            "I_game_qzniu_icon",
            "I_game_qzniu_font"
          ]);
          Utils.FN.DrawObj(ctx, HST, ["I_game_man"], { xto: -678, yto: 306 });
          Utils.FN.DrawObj(ctx, HST, ["F_font"], {
            str: "8888",
            xto: -650,
            yto: 302,
            size: 24,
            color: "#FED582"
          });
          Utils.FN.DrawObj(ctx, HST, ["A_game_star"], { xto: -850, yto: 60 });

          // 扎金花
          Utils.FN.DrawObj(ctx, HST, [
            "I_game_jinhua_bg",
            "I_game_jinhua_font"
          ]);
          Utils.FN.DrawObj(ctx, HST, ["A_game_public_line"], {
            xto: -372,
            yto: -338
          });
          Utils.FN.DrawObj(ctx, HST, ["I_game_man"], { xto: -162, yto: -30 });
          Utils.FN.DrawObj(ctx, HST, ["F_font"], {
            str: "8888",
            xto: -134,
            yto: -34,
            size: 24,
            color: "#FED582"
          });
          Utils.FN.DrawObj(ctx, HST, ["A_game_star_small"], {
            xto: -370,
            yto: -152
          });

          // 斗地主
          Utils.FN.DrawObj(ctx, HST, ["I_game_doudz_bg", "I_game_doudz_font"]);
          Utils.FN.DrawObj(ctx, HST, ["A_game_public_line"], {
            xto: 27,
            yto: -338
          });
          Utils.FN.DrawObj(ctx, HST, ["I_game_man"], { xto: 238, yto: -30 });
          Utils.FN.DrawObj(ctx, HST, ["F_font"], {
            str: "898",
            xto: 266,
            yto: -34,
            size: 24,
            color: "#FED582"
          });
          Utils.FN.DrawObj(ctx, HST, ["A_game_star_small_1"], {
            xto: 74,
            yto: -150
          });

          // 德州扑克
          Utils.FN.DrawObj(ctx, HST, ["I_game_dzpk_bg", "I_game_dzpk_font"]);
          Utils.FN.DrawObj(ctx, HST, ["A_game_public_line"], {
            xto: 428,
            yto: -338
          });
          Utils.FN.DrawObj(ctx, HST, ["I_game_man"], { xto: 638, yto: -30 });
          Utils.FN.DrawObj(ctx, HST, ["F_font"], {
            str: "898",
            xto: 666,
            yto: -34,
            size: 24,
            color: "#FED582"
          });
          Utils.FN.DrawObj(ctx, HST, ["A_game_star_small_2"], {
            xto: 446,
            yto: -150
          });

          // 三公
          Utils.FN.DrawObj(ctx, HST, ["I_game_sang_bg", "I_game_sang_font"]);
          Utils.FN.DrawObj(ctx, HST, ["A_game_public_line"], {
            xto: -372,
            yto: 12
          });
          Utils.FN.DrawObj(ctx, HST, ["I_game_man"], { xto: -160, yto: 320 });
          Utils.FN.DrawObj(ctx, HST, ["F_font"], {
            str: "8888",
            xto: -134,
            yto: 316,
            size: 24,
            color: "#FED582"
          });
          Utils.FN.DrawObj(ctx, HST, ["A_game_star_small_3"], {
            xto: -372,
            yto: 200
          });

          // 麻将
          Utils.FN.DrawObj(ctx, HST, ["I_game_maj_bg", "I_game_maj_font"]);
          Utils.FN.DrawObj(ctx, HST, ["A_game_public_line"], {
            xto: 27,
            yto: 12
          });
          Utils.FN.DrawObj(ctx, HST, ["I_game_man"], { xto: 238, yto: 320 });
          Utils.FN.DrawObj(ctx, HST, ["F_font"], {
            str: "8888",
            xto: 266,
            yto: 316,
            size: 24,
            color: "#FED582"
          });
          Utils.FN.DrawObj(ctx, HST, ["A_game_star_small_4"], {
            xto: 44,
            yto: 196
          });

          // 百家乐
          Utils.FN.DrawObj(ctx, HST, ["I_game_bjl_bg", "I_game_bjl_font"]);
          Utils.FN.DrawObj(ctx, HST, ["A_game_public_line"], {
            xto: 428,
            yto: 12
          });
          Utils.FN.DrawObj(ctx, HST, ["I_game_man"], { xto: 638, yto: 320 });
          Utils.FN.DrawObj(ctx, HST, ["F_font"], {
            str: "898",
            xto: 666,
            yto: 316,
            size: 24,
            color: "#FED582"
          });
          Utils.FN.DrawObj(ctx, HST, ["A_game_star_small_4"], {
            xto: 466,
            yto: 130
          });
      }

      // 当窗口尺寸调整 或者状态改变时 保存为图片 当做canvas父级盒子的背景图，在缩放时减小屏闪
      if (
        computeScale !== _that.Base.watchScale ||
        computeState !== HST.STATE
      ) {
        _that.changeBg();
        computeScale = _that.Base.watchScale;
        computeState = HST.STATE;
      }
    }, HST.FPS);

    // 绑定事件
    _that.ctxele.addEventListener("click", function(e) {
      _that.canvasclick(e);
    });
  }

  public canvasclick(e) {
    // 设置背景音乐 移动端
    // Utils.FN.mobile_bg_music(this.Base.Music.bg_music.dom, "../../assets/media/home.mp3");

    let _that = this;

    let ME = { x: e.offsetX, y: e.offsetY };
    let evdata = _that.Hst.EVENT;
    if (evdata.length) {
      for (let i = evdata.length - 1; i >= 0; i--) {
        let o = evdata[i];
        if (o.s == "rect") {
          if (ME.x > o.x && ME.x < o.xl && ME.y > o.y && ME.y < o.yl) {
            o.ob.eventdata.click &&
              o.ob.eventdata.click(_that.Hst, function() {
                console.log("点击了矩形 :", o.ob);

                // 触发点击音效
                Utils.FN.play_game_music(
                  _that.Base.Music.game_music.doms,
                  "../../../../assets/media/qzniu/anniu.mp3"
                );
              });
            return;
          }
        } else {
          let r = (o.xl - o.x) / 2;
          o.x += r;
          o.y += r;
          if (Utils.FN.pointInsideCircle(ME, o, r)) {
            o.ob.eventdata.click &&
              o.ob.eventdata.click(_that.Hst, function() {
                console.log("点击了圆形 :", o.ob);

                // 触发点击音效
                Utils.FN.play_game_music(
                  _that.Base.Music.game_music.doms,
                  "../../../../assets/media/qzniu/anniu.mp3"
                );
              });
            return;
          }
        }
      }
    }
  }

  public changeBg() {
    this.Base.Pagebg = this.ctxele.toDataURL();
  }
}
