import { Component, OnInit, AfterViewInit, ElementRef } from "@angular/core";

import { BaseService } from "../../services/base.service";
import {
  CVGRAPH,
  CVIMG,
  CVANIMAT,
  CVFONT,
  CreateObj
} from "../../factory/tcanvasobject";
import { KyserviceService } from "./kystore.service";
import { Utils } from "../../factory/utils.js";

@Component({
  selector: "app-kygame",
  templateUrl: "./kygame.component.html",
  styleUrls: ["./kygame.component.scss"]
})
export class KygameComponent implements OnInit, AfterViewInit {
  constructor(
    private el: ElementRef,
    public Base: BaseService,
    public Ky: KyserviceService
  ) {}

  public ctxele; // canvas元素
  public timer; // 绘制画面的计时器
  public CountDown: number = 0;

  ngOnInit() {
    // 设置设计稿尺寸 初始窗口画布尺寸
    this.Base.uiwidth = 1920;
    this.Base.uiheight = 750;
    this.Base.initWidow();

    this.Ky.CVDATA = {} ;

    // 初始化绘画数据
    Utils.FN.ObMaping(this.Ky.CVDATA, CreateObj(this.Ky.initiate));

    this.init();
  }
  ngAfterViewInit() {}

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
    const KY = this.Ky;

    // 背景图
    const bg_1 = new Image();
    const topbar_1 = new Image();
    bg_1.src = "../../../assets/images/kyqp/game_qiangniu/bg.png";
    topbar_1.src = "../../../assets/images/kyqp/game_qiangniu/top_bar.png";

    let imadata_left = null;
    let imadata_right = null;

    this.timer = setInterval(function() {
      _that.Ky.CW = _that.Base.canvasWidth; // 画布宽度
      _that.Ky.CH = _that.Base.canvasHeight; // 画布高度
      _that.Ky.CS = _that.Base.scale; // 画布缩放比例
      _that.Ky.EVENT = []; // 事件绑定坐标数据
      _that.Ky.DELAY = Math.floor(Math.random() * (600 - 200)); // 模拟网络延迟时间
      // _that.Ky.CVDATA.A_top_delay.currindex = Math.floor(_that.Ky.DELAY / 100); // 延迟图标切换

      // 清理画布
      ctx.beginPath();
      ctx.clearRect(0, 0, KY.CW, KY.CH);
      ctx.closePath();

      ctx.drawImage(bg_1, 0, 0, KY.CW, KY.CH); // 绘制背景 宽度全屏的图片必须原生绘制
      ctx.drawImage(topbar_1, 0, 0, KY.CW, 89 * KY.CS);

      // 头部区域内容
      Utils.FN.DrawObj(ctx, KY, [
        "I_top_log",
        "I_top_money",
        "I_top_set",
        "I_top_extend",
        "I_top_shrink",
        "I_tip_bg",
        "I_tip_bell",
        // "A_top_delay"
      ]);
      Utils.FN.DrawObj(ctx, KY, ["F_font_wt"], {
        str: "ID：仲夏夜之梦",
        xtl: 450,
        ytt: 14,
        size: 14,
        color: "#FFFFFF"
      });
      Utils.FN.DrawObj(ctx, KY, ["F_font_wt"], {
        str: "500",
        xtl: 510,
        ytt: 56,
        size: 14,
        color: "#F0DD0A"
      });
      Utils.FN.DrawObj(ctx, KY, ["F_font"], {
        str: `延迟:${_that.Ky.DELAY}ms`,
        size: 12,
        xtr: 80,
        ytt: 50,
        color: "#FF0000"
      });

      switch (_that.Ky.STATE) {
        case 0:
          // // 游戏选择区域
          Utils.FN.DrawObj(ctx, KY, [
            "A_qiangniu_bg",
            "A_qiangniu_icon",
            "A_qiangniu_star"
          ]); // 抢庄牛牛
          Utils.FN.DrawObj(ctx, KY, ["I_icon_man"], { xto: -380, yto: 250 });
          Utils.FN.DrawObj(ctx, KY, ["F_font"], {
            str: "668",
            xto: -360,
            yto: 250,
            color: "#FFFFFF"
          });

          Utils.FN.DrawObj(ctx, KY, ["A_jinhua_bg", "A_jinhua_icon"]); // 金花
          Utils.FN.DrawObj(ctx, KY, ["I_icon_man"], { xto: -210, yto: 22 });
          Utils.FN.DrawObj(ctx, KY, ["F_font"], {
            str: "668",
            xto: -190,
            yto: 22,
            color: "#FFFFFF"
          });

          Utils.FN.DrawObj(ctx, KY, ["A_erbag_bg", "A_erbag_icon"]); // 二八杠
          Utils.FN.DrawObj(ctx, KY, ["I_icon_man"], { xto: 16, yto: 22 });
          Utils.FN.DrawObj(ctx, KY, ["F_font"], {
            str: "668",
            xto: 36,
            yto: 22,
            color: "#FFFFFF"
          });

          Utils.FN.DrawObj(ctx, KY, ["A_sang_bg", "A_sang_icon"]); // 三公
          Utils.FN.DrawObj(ctx, KY, ["I_icon_man"], { xto: 242, yto: 22 });
          Utils.FN.DrawObj(ctx, KY, ["F_font"], {
            str: "668",
            xto: 262,
            yto: 22,
            color: "#FFFFFF"
          });

          Utils.FN.DrawObj(ctx, KY, ["A_doudz_bg", "A_doudz_icon"]); // 斗地主
          Utils.FN.DrawObj(ctx, KY, ["I_icon_man"], { xto: 465, yto: 22 });
          Utils.FN.DrawObj(ctx, KY, ["F_font"], {
            str: "668",
            xto: 485,
            yto: 22,
            color: "#FFFFFF"
          });

          Utils.FN.DrawObj(ctx, KY, ["A_bjl_bg", "A_bjl_icon"]); // 百家乐
          Utils.FN.DrawObj(ctx, KY, ["I_icon_man"], { xto: -210, yto: 260 });
          Utils.FN.DrawObj(ctx, KY, ["F_font"], {
            str: "888",
            xto: -190,
            yto: 260,
            color: "#FFFFFF"
          });

          Utils.FN.DrawObj(ctx, KY, ["A_eryi_bg", "A_eryi_icon"]); // 21点
          Utils.FN.DrawObj(ctx, KY, ["I_icon_man"], { xto: 16, yto: 260 });
          Utils.FN.DrawObj(ctx, KY, ["F_font"], {
            str: "668",
            xto: 36,
            yto: 260,
            color: "#FFFFFF"
          });

          Utils.FN.DrawObj(ctx, KY, ["A_dzpk_bg", "A_dzpk_icon"]); // 德州扑克
          Utils.FN.DrawObj(ctx, KY, ["I_icon_man"], { xto: 242, yto: 260 });
          Utils.FN.DrawObj(ctx, KY, ["F_font"], {
            str: "668",
            xto: 262,
            yto: 260,
            color: "#FFFFFF"
          });

          Utils.FN.DrawObj(ctx, KY, ["A_maj_bg", "A_maj_icon"]); // 麻将
          Utils.FN.DrawObj(ctx, KY, ["I_icon_man"], { xto: 465, yto: 260 });
          Utils.FN.DrawObj(ctx, KY, ["F_font"], {
            str: "668",
            xto: 485,
            yto: 260,
            color: "#FFFFFF"
          });

          break;

        case 1:
          // ctx.drawImage(bg_1, 0, 0, KY.CW, KY.CH); // 绘制背景 宽度全屏的图片必须原生绘制
          // ctx.drawImage(topbar_1, 0, 0, KY.CW, 89 * KY.CS);
          break;

        default:
          console.log("动画没执行");
          break;
      }

      // 绘制公告条
      if (KY.CW / 2 - 520 * KY.CS > 0) {
        imadata_left = ctx.getImageData(
          0,
          140 * KY.CS,
          KY.CW / 2 - 520 * KY.CS,
          41 * KY.CS
        );
        imadata_right = ctx.getImageData(
          KY.CW / 2 + 520 * KY.CS,
          140 * KY.CS,
          KY.CW / 2 - 520 * KY.CS + 10,
          41 * KY.CS
        );
      }
      // 文字绘制
      Utils.FN.DrawObj(ctx, KY, ["F_top_tips"], {
        str:
          "拉什福德后我去额呼入王企鹅号日王企鹅号人拉什福德后我去额呼入王企鹅号日王企鹅号人drfthgrtge rterger拉什福德后我去额呼入王企鹅号日王企鹅号人",
        size: 16,
        xto: 530,
        ytt: 150,
        color: "#F0DD0A"
      });

      if (KY.CW / 2 - 520 * KY.CS > 0) {
        ctx.putImageData(imadata_left, 0, 140 * KY.CS);
        ctx.putImageData(imadata_right, KY.CW / 2 + 520 * KY.CS, 140 * KY.CS);
      }
      // 公告条绘制结束

      // 绘制loging 动画
      Utils.FN.DrawObj(ctx, KY, ['A_loging']);

      Utils.FN.Timer(KY, function() {
        Utils.FN.DrawObj(ctx, KY, ['F_mid_timer']);
      });

      // ctx.save();
      // ctx.scale(2,2);
      // ctx.rotate(30 * Math.PI / 180);//旋转47度
      Utils.FN.DrawObj(ctx, KY, ["G_test"],{
        xto:-260,
        yto:-260,
        fc: "#FFFF00",
        sc: "#ff0000",
        lw: "28",
        fill: true,
        shape: 'rect',

      });
      // ctx.restore()

      // ctx.clearRect(0, 0, KY.CW, KY.CH);

      // 当窗口尺寸调整 或者状态改变时 保存为图片 当做canvas父级盒子的背景图，在缩放时减小屏闪
      if (computeScale !== _that.Base.watchScale || computeState !== KY.STATE) {
        _that.changeBg();
        computeScale = _that.Base.watchScale;
        computeState = KY.STATE;
      }
    }, KY.FPS);

    // 绑定事件
    _that.ctxele.addEventListener("click", function(e) {
      _that.canvasclick(e);
    });
  }

  public canvasclick(e) {
    let _that = this;

    let ME = { x: e.offsetX, y: e.offsetY };
    let evdata = _that.Ky.EVENT;
    if (evdata.length) {
      for (let i = evdata.length - 1; i >= 0; i--) {
        let o = evdata[i];
        if (o.s == "rect") {
          if (ME.x > o.x && ME.x < o.xl && ME.y > o.y && ME.y < o.yl) {
            o.ob.eventdata.click &&
              o.ob.eventdata.click(_that.Ky, function() {
                console.log("点击了矩形 :", o.ob);
              });
            return;
          }
        } else {
          let r = (o.xl - o.x) / 2;
          o.x += r;
          o.y += r;
          if (Utils.FN.pointInsideCircle(ME, o, r)) {
            o.ob.eventdata.click &&
              o.ob.eventdata.click(_that.Ky, function() {
                console.log("点击了圆形 :", o.ob);
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
