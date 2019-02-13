import { Component, OnInit, ElementRef } from "@angular/core";

import { BaseService } from "../../services/base.service";
import { CreateObj } from "../../factory/tcanvasobject";

import { WebsocketService } from "../../services/websocket.service";
import { HttpclientService } from "../../services/httpclient.service";
import { Utils } from "../../factory/utils.js";

import { SangService } from "./sangStore.service";

@Component({
  selector: "app-sang",
  templateUrl: "./sang.component.html",
  styleUrls: ["./sang.component.scss"]
})
export class SangComponent implements OnInit {
  constructor(
    private el: ElementRef,
    public Base: BaseService,
    public Store: SangService,
    public WS: WebsocketService,
    public Http: HttpclientService
  ) {}

  public ctxele; // canvas元素
  public timer; // 绘制画面的计时器

  ngOnInit() {
    // 设置设计稿尺寸 初始窗口画布尺寸
    this.Base.uiwidth = 1920;
    this.Base.uiheight = 1080;
    this.Base.initWidow();

    // 初始化所有绘画数据
    this.Store.CVDATA = {};

    // 初始化绘画数据
    Utils.FN.ObMaping(this.Store.CVDATA, CreateObj(this.Store.initiate));

    this.init();
  }
  ngAfterViewInit() {
    // 设置背景音乐
    Utils.FN.play_bg_music(
      this.Base.Music.bg_music.dom,
      "../../assets/media/qzniu/game.mp3"
    );
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
    const ST = this.Store;

    // 背景图
    const bg_1 = new Image();
    bg_1.src = "../../../assets/images/sang/bg.png";
    const bg_2 = new Image();
    bg_2.src = "../../../assets/images/common/baseicon_01.png";

    // 延迟文字变化颜色
    const colors = [
      "#85C730",
      "#85C730",
      "#EFCD62",
      "#EFCD62",
      "#FF3F3F",
      "#FF3F3F"
    ];

    // 滚动信息两边遮罩图片
    let imadata_left = null;
    let imadata_right = null;

    this.timer = setInterval(function() {
      ST.CW = _that.Base.canvasWidth; // 画布宽度
      ST.CH = _that.Base.canvasHeight; // 画布高度
      ST.CS = _that.Base.scale; // 画布缩放比例
      ST.EVENT = []; // 事件绑定坐标数据

      ST.DELAY = Math.floor(Math.random() * (600 - 0)); // 模拟网络延迟时间
      let delay_index = Math.floor(ST.DELAY / 100);
      ST.CVDATA["A_top_delay"].currindex = delay_index; // 延迟图标

      // 清理画布
      ctx.beginPath();
      ctx.clearRect(0, 0, ST.CW, ST.CH);
      ctx.closePath();

      ctx.drawImage(bg_1, 0, 0, ST.CW, ST.CH); // 绘制背景 宽度全屏的图片必须原生绘制
      ctx.drawImage(bg_2, 0, 0, ST.CW, 110 * ST.CS);

      switch (ST.STATE) {
        case 0:
          // 头部
          Utils.FN.DrawObj(ctx, ST, ["A_bg"], {
            uiw: ST.CW,
            uih: ST.CH
          });
          Utils.FN.DrawObj(ctx, ST, [
            "I_top_left",
            "I_top_back",
            "I_top_log",
            "I_top_linebg",
            "A_top_coin",
            "I_top_rest",
            "I_top_rest_add",
            "I_top_record",
            "I_top_rule",
            "I_top_set",
            "A_top_delay",
            "I_tip_bg",
            "I_tip_bell"
          ]);
          Utils.FN.DrawObj(ctx, ST, ["F_font"], {
            str: `延迟:${ST.DELAY}ms`,
            size: 18,
            xtr: 120,
            ytt: 62,
            color: colors[delay_index]
          });
          Utils.FN.DrawObj(ctx, ST, ["F_font"], {
            str: _that.Base.userinfo.balance,
            xtl: 546,
            ytt: 40,
            size: 24,
            color: "#FFBA00"
          });

          // 左边大图

          Utils.FN.DrawObj(ctx, ST, ["I_icon_man", "A_left_smog"]);

          // 体验房
          Utils.FN.DrawObj(ctx, ST, [
            "I_room0_bg",
            "A_room0_twirl",
            "A_room0_circle",
            "A_room0_anicon",
            "A_room0_glint"
          ]);
          Utils.FN.DrawObj(ctx, ST, ["F_font"], {
            str: "底注：1",
            xto: 0,
            yto: -104,
            size: 20,
            color: "#FFFFFF"
          });
          Utils.FN.DrawObj(ctx, ST, ["F_font"], {
            str: "准入：100",
            xto: 120,
            yto: -104,
            size: 20,
            color: "#FFFFFF"
          });

          // 初级房
          Utils.FN.DrawObj(ctx, ST, [
            "I_room1_bg",
            "A_room1_twirl",
            "A_room1_circle",
            "A_room1_anicon",
            "A_room1_glint"
          ]);
          Utils.FN.DrawObj(ctx, ST, ["F_font"], {
            str: "底注：2",
            xto: 474,
            yto: -104,
            size: 20,
            color: "#FFFFFF"
          });
          Utils.FN.DrawObj(ctx, ST, ["F_font"], {
            str: "准入：200",
            xto: 594,
            yto: -104,
            size: 20,
            color: "#FFFFFF"
          });

          // 中级房
          Utils.FN.DrawObj(ctx, ST, [
            "I_room2_bg",
            "A_room2_twirl",
            "A_room2_circle",
            "A_room2_anicon",
            "A_room2_glint"
          ]);
          Utils.FN.DrawObj(ctx, ST, ["F_font"], {
            str: "底注：3",
            xto: 0,
            yto: 152,
            size: 20,
            color: "#FFFFFF"
          });
          Utils.FN.DrawObj(ctx, ST, ["F_font"], {
            str: "准入：300",
            xto: 120,
            yto: 152,
            size: 20,
            color: "#FFFFFF"
          });

          // 高级房
          Utils.FN.DrawObj(ctx, ST, [
            "I_room3_bg",
            "A_room3_twirl",
            "A_room3_circle",
            "A_room3_anicon",
            "A_room3_glint"
          ]);
          Utils.FN.DrawObj(ctx, ST, ["F_font"], {
            str: "底注：4",
            xto: 474,
            yto: 152,
            size: 20,
            color: "#FFFFFF"
          });
          Utils.FN.DrawObj(ctx, ST, ["F_font"], {
            str: "准入：400",
            xto: 594,
            yto: 152,
            size: 20,
            color: "#FFFFFF"
          });

          // 王者房
          Utils.FN.DrawObj(ctx, ST, [
            "I_room4_bg",
            "A_room4_twirl",
            "A_room4_circle",
            "A_room4_anicon",
            "A_room4_glint"
          ]);
          Utils.FN.DrawObj(ctx, ST, ["F_font"], {
            str: "底注：5",
            xto: 0,
            yto: 408,
            size: 20,
            color: "#FFFFFF"
          });
          Utils.FN.DrawObj(ctx, ST, ["F_font"], {
            str: "准入：1000",
            xto: 120,
            yto: 408,
            size: 20,
            color: "#FFFFFF"
          });

          // 至尊房
          Utils.FN.DrawObj(ctx, ST, [
            "I_room5_bg",
            "A_room5_twirl",
            "A_room5_circle",
            "A_room5_anicon",
            "A_room5_glint"
          ]);
          Utils.FN.DrawObj(ctx, ST, ["F_font"], {
            str: "底注：16",
            xto: 474,
            yto: 408,
            size: 20,
            color: "#FFFFFF"
          });
          Utils.FN.DrawObj(ctx, ST, ["F_font"], {
            str: "准入：10000",
            xto: 594,
            yto: 408,
            size: 20,
            color: "#FFFFFF"
          });
      }

      // 绘制公告条
      if (ST.CW / 2 - 550 * ST.CS > 0) {
        imadata_left = ctx.getImageData(
          0,
          110 * ST.CS,
          ST.CW / 2 - 500 * ST.CS,
          76 * ST.CS
        );
        imadata_right = ctx.getImageData(
          ST.CW / 2 + 550 * ST.CS,
          110 * ST.CS,
          ST.CW / 2 - 550 * ST.CS + 10,
          76 * ST.CS
        );
      }
      // 文字绘制
      Utils.FN.DrawObj(ctx, ST, ["F_top_tips"], {
        str:
          "拉什福德后我去额呼入王企鹅号日王企鹅号人拉什福德后我去额呼入王企鹅号日王企鹅号人drfthgrtge rterger拉什福德后我去额呼入王企鹅号日王企鹅号人",
        size: 24,
        xto: 550,
        ytt: 132,
        color: "#FFFFFF"
      });

      if (ST.CW / 2 - 550 * ST.CS > 0) {
        ctx.putImageData(imadata_left, 0, 110 * ST.CS);
        ctx.putImageData(imadata_right, ST.CW / 2 + 550 * ST.CS, 110 * ST.CS);
      }
      // 公告条绘制结束

      // 当窗口尺寸调整 或者状态改变时 保存为图片 当做canvas父级盒子的背景图，在缩放时减小屏闪
      if (computeScale !== _that.Base.watchScale || computeState !== ST.STATE) {
        _that.changeBg();
        computeScale = _that.Base.watchScale;
        computeState = ST.STATE;
      }
    }, ST.FPS);

    // 绑定事件
    _that.ctxele.addEventListener("click", function(e) {
      _that.canvasclick(e);
    });
  }

  public canvasclick(e) {
    let _that = this;

    let ME = { x: e.offsetX, y: e.offsetY };
    let evdata = _that.Store.EVENT;
    if (evdata.length) {
      for (let i = evdata.length - 1; i >= 0; i--) {
        let o = evdata[i];
        if (o.s == "rect") {
          if (ME.x > o.x && ME.x < o.xl && ME.y > o.y && ME.y < o.yl) {
            o.ob.eventdata.click &&
              o.ob.eventdata.click(_that.Store, function() {
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
              o.ob.eventdata.click(_that.Store, function() {
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
