import { Component, OnInit, AfterViewInit, ElementRef } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { BaseService } from "../../../services/base.service";
import { CreateObj, CVIMG } from "../../../factory/tcanvasobject";

import { WebsocketService } from "../../../services/websocket.service";
import { HttpclientService } from "../../../services/httpclient.service";
import { Utils } from "../../../factory/utils.js";

import { SangroomStoreService } from "./sangroom-store.service";

@Component({
  selector: "app-sangroom",
  templateUrl: "./sangroom.component.html",
  styleUrls: ["./sangroom.component.scss"]
})
export class SangroomComponent implements OnInit, AfterViewInit {
  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private el: ElementRef,
    public Base: BaseService,
    public Store: SangroomStoreService,
    public WS: WebsocketService,
    public Http: HttpclientService
  ) {}

  public ctxele; // canvas元素
  public CTX; // canvas上下文
  public timer; // 绘制画面的计时器
  public pk_names = []; // 扑克牌名称
  public result_nius = []; // 开牌几点 图片
  public player_faces = []; // 用户头像 图片

  public curr_route_id; // 当前路由ID
  public curr_room; // 当前房间
  public rooms = {
    tiyan: { name: "体验房", id: "001", dizhu: 1, player_numb: 0 },
    chuji: { name: "初级房", id: "002", dizhu: 2, player_numb: 0 },
    zhongji: { name: "中级房", id: "003", dizhu: 3, player_numb: 0 },
    gaoji: { name: "高级房", id: "004", dizhu: 4, player_numb: 0 },
    wangzhe: { name: "王者房", id: "005", dizhu: 5, player_numb: 0 },
    zhizun: { name: "至尊房", id: "006", dizhu: 6, player_numb: 0 }
  };

  ngOnInit() {
    // 获取路由参数 确定当前房间
    this.route.params.subscribe(data => {
      if (Object.keys(this.rooms).includes(data.id)) {
        this.curr_room = this.rooms[data.id].name;
        this.curr_room = Object.assign({}, this.rooms[data.id]);
      } else {
        // 如果路由房间不存在，跳转到体验房
        this.router.navigate(["game/sangroom/tiyan"]);
      }
    });

    // 设置设计稿尺寸 初始窗口画布尺寸
    this.Base.uiwidth = 1920;
    this.Base.uiheight = 1080;
    this.Base.initWidow();

    // 扑克牌图片对象创建
    this.pk_names = this.set_pkpName(); // 定义扑克牌名称
    this.Store.PKP_img = this.set_pkpImg(this.pk_names); // 创建所有扑克牌图片
    this.result_nius = this.set_niuImg(); // 创建所有开牌时几点 图片
    this.player_faces = this.set_faceImg(); // 创建所有开牌时牛几 图片
  }

  ngAfterViewInit() {
    this.ctxele = this.el.nativeElement.querySelector("#canvas");
    this.CTX = this.ctxele.getContext("2d");

    this.init();
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  public init() {
    let _that = this;
    let ST = this.Store;

    _that.timer && clearInterval(_that.timer); // 清除定时器

    // 初始化基本数据
    ST.CVDATA = {};
    ST.EVENT = [];
    ST.FPS = 100;
    ST.Compute = { data: [], add: "", active: true };

    // 初始化绘画数据
    Utils.FN.ObMaping(this.Store.CVDATA, CreateObj(this.Store.initiate));

    // 初始当前画布绘制状态
    ST.STATE = {
      step: 0,
      animate: 5, // step: 5 而且animate: 5 时进入发牌过程
      player0: {
        status: 1,
        animate: 1, // 11 进入开牌过程
        name: "vitor", // 玩家昵称
        id: "00000", // 玩家ID
        face: 0, // 显示玩家的头像,目前定义0~9  10张用户头像
        balance: 0, // 玩家余额
        gender: 1, // 玩家性别 0：女 1：男
        qz_times: -1, // 抢庄倍数 初始-1
        xz_times: -1, // 下注倍数 初始-1
        pkps: [], //玩家拿到的牌
        pin_ok: false,
        pkp_type: 0, // 拿到的牌型 0：没牛， 1~9：牛1~9，10：普通牛牛， 11：五小牛， 12：四花牛，13：五花牛，14：四炸
        result: 888, // 本局结算输赢
        doubling: 1 // 当前游戏玩家的倍率
      },
      player1: {
        status: 1,
        animate: 1,
        name: "coco",
        id: "00001",
        face: 0,
        balance: 6888.88,
        gender: 0,
        qz_times: -1,
        xz_times: -1,
        pkps: [],
        pin_ok: false,
        pkp_type: 0,
        result: -36.5,
        doubling: 1
      },
      player2: {
        status: 1,
        animate: 1,
        name: "billy",
        id: "00002",
        face: 0,
        balance: 0,
        gender: 1,
        qz_times: -1,
        xz_times: -1,
        pkps: [],
        pin_ok: false,
        pkp_type: 0,
        result: 36.5,
        doubling: 1
      },
      player3: {
        status: 1,
        animate: 1,
        qz_times: -1,
        name: "max",
        id: "00003",
        face: 0,
        balance: 0,
        gender: 0,
        xz_times: -1,
        pkps: [],
        pin_ok: false,
        pkp_type: 0,
        result: 0,
        doubling: 1
      },
      player4: {
        status: 1,
        animate: 1,
        qz_times: -1,
        name: "max",
        id: "00003",
        face: 0,
        balance: 0,
        gender: 0,
        xz_times: -1,
        pkps: [],
        pin_ok: false,
        pkp_type: 0,
        result: -38.88,
        doubling: 1
      },
      qzhuang: -1, // 当前抢庄玩家  初始-1
      qzhuang_palyers: [], // 当前抢庄倍率最高的玩家集合
      play_zhuang: 4, // 庄家  初始-1
      zhuang_win_lose: 0, // 当前游戏庄家通杀通赢状态:0：默认无状态 1：庄家通输， 2：庄家通赢
      popup: 0
    };

    // // 临时扑克牌牌面  TODO ： 连接后台数据后删除
    // let random_pkp = (function(_that) {
    //   let setdata = new Set();
    //   for (let q = 0; q < 20; q = setdata.size) {
    //     let n = Utils.FN.Random(0, 51);
    //     setdata.add(_that.pk_names[n]);
    //   }
    //   let arr = Array.from(setdata);
    //   return arr;
    // })(_that);

    // 临时随机定义玩家数据 TODO ： 连接后台数据后删除
    for (let i = 0; i < 4; i++) {
      let name = "player" + i;
      // ST.STATE[name].pkps = random_pkp.slice(i * 5, i * 5 + 5);
      ST.STATE[name].face = Utils.FN.Random(0, 9);
      ST.STATE[name].balance = Utils.FN.Random(1000, 1000000) / 100;
      ST.STATE[name].gender = Utils.FN.Random(0, 1);
      // ST.STATE[name].pkp_type = Utils.FN.Random(0, 14);
      // ST.STATE[name].result = Utils.FN.Random(-5000, 10000);
      // ST.STATE[name].doubling = Utils.FN.Random(1, 20);
    }
    // ST.STATE.zhuang_win_lose = Utils.FN.Random(0, 2);

    let computeScale = -1; // 监听窗口大小变化后的画布比例变化
    let computeState = -1; // 监听绘画状态变化
    let compute_open_pk = 0; // 开牌玩家下标
    let qzs_play = []; // 抢庄倍数相同的玩家自动分配庄家
    let compute_currqu_index = 0; // 计算抢庄时玩家下标
    let currqu_index = 0; // 抢庄倍数相同的玩家自动分配庄家时轮流显示动画时的玩家下标
    let xz_data = []; // 玩家下注倍数数组

    // 游戏中绘制加载动画数据
    let loding_data = {
      endAngle: 0,
      color_aign: true,
      color_1: "#0D1F37",
      color_2: "#F0EE01"
    };

    // 延迟文字变化颜色
    const colors = [
      "#85C730",
      "#85C730",
      "#EFCD62",
      "#EFCD62",
      "#FF3F3F",
      "#FF3F3F"
    ];

    //   // 初始化画布
    const ctx = _that.CTX;

    //背景图
    const bg_1 = new Image();
    bg_1.src = "../../../../assets/images/sang/room/bg.png";
    const bg_2 = new Image();
    bg_2.src = "../../../../assets/images/common/baseicon_01.png";
    const shade = new Image(); // 遮罩层
    shade.src = "../../../../assets/images/common/opacity_30.png";

    // 滚动信息两边遮罩图片
    let imadata_left = null;
    let imadata_right = null;

    let play0_pk_last_open = false; // 玩家0 是否开牌

    this.timer = setInterval(function() {
      ST.CW = _that.Base.canvasWidth; // 画布宽度
      ST.CH = _that.Base.canvasHeight; // 画布高度
      ST.CS = _that.Base.scale; // 画布缩放比例
      ST.EVENT = []; // 事件绑定坐标数据
      ST.DELAY = Math.floor(Math.random() * (600 - 0)); // 模拟网络延迟时间
      let delay_index = Math.floor(ST.DELAY / 100);
      ST.CVDATA["A_top_delay"].currindex = delay_index; // 延迟图标切换

      // 清理画布
      ctx.beginPath();
      ctx.clearRect(0, 0, ST.CW, ST.CH);
      ctx.closePath();

      ctx.drawImage(bg_1, 0, 0, ST.CW, ST.CH); // 绘制背景 宽度全屏的图片原生绘制
      ctx.drawImage(bg_2, 0, 0, ST.CW, 110 * ST.CS);

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
        "I_desk",
        "A_croupier",
        "I_tip_bg",
        "I_tip_bell",
        "I_time_bg"
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
      Utils.FN.DrawObj(ctx, ST, ["F_font"], {
        str: "牌局编号：",
        xtl: 206,
        ytt: 136,
        size: 24,
        color: "#FFFFFF"
      });
      Utils.FN.DrawObj(ctx, ST, ["F_font"], {
        str: "50-1544667761-32965881-2",
        xtl: 330,
        ytt: 136,
        size: 24,
        color: "#FFD385"
      });
      Utils.FN.DrawObj(ctx, ST, ["F_font_wt"], {
        str: `底注：${_that.curr_room.dizhu}`,
        xto: -60,
        yto: -40,
        size: 30,
        color: "#0A4A50"
      });

      let play0_pk_names = ST.PkpGroup.player0.pkname; // 玩家0扑克牌 对象名称

      switch (ST.STATE.step) {
        case 0:
          Utils.FN.DrawObj(ctx, ST, [..._that.Store.PKP.arr]);
          break;
        case 5:
          _that.set_pkp_animate(); // 设置发牌数据
          // 触发发牌音效
          // Utils.FN.play_game_music(
          //   _that.Base.Music.game_music.doms,
          //   "../../../../assets/media/qzniu/fapai.mp3"
          // );
          // ST.STATE.animate = 5;
          // ST.STATE.player0.animate = 5;
          // ST.STATE.player1.animate = 5;
          // ST.STATE.player2.animate = 5;
          // ST.STATE.player3.animate = 5;
          // ST.STATE.step = 6;

          // // 随机设置其他玩家下倍数 TODO : 连接后台数据需删除
          // ST.STATE.player1.xz_times = Utils.FN.Random(1, 15);
          // ST.STATE.player2.xz_times = Utils.FN.Random(1, 15);
          // ST.STATE.player3.xz_times = Utils.FN.Random(1, 15);
          break;
        case 6:
          // Utils.FN.DrawObj(ctx, ST, [
          //   ..._that.Store.PKP.arr,
          //   ..._that.Store.PKP.store
          // ]);
          break;
      }

      // 玩家0
      switch (ST.STATE.player0.status) {
        case 0:
          break;
        case 1:
          Utils.FN.DrawObj(ctx, ST, [
            "I_py0_bg_01",
            "I_py0_bg_02",
            "A_py0_bg_03",
            "I_py0_face"
          ]);
          Utils.FN.DrawObj(ctx, ST, ["F_font"], {
            str: ST.STATE.player0.name,
            xto: -200,
            yto: 340,
            size: 24,
            color: "#FFFFFF"
          });
          Utils.FN.DrawObj(ctx, ST, ["F_font"], {
            str: `￥${ST.STATE.player0.balance}`,
            xto: -200,
            yto: 376,
            size: 24,
            color: "#FFD385"
          });
          Utils.FN.DrawObj(ctx, ST, ["F_font_wt"], {
            str:
              ST.STATE.player0.result < 0
                ? ST.STATE.player0.result + ""
                : "+" + ST.STATE.player0.result,
            xto: -240,
            yto: 270,
            size: 36,
            stroke: true,
            sc: "#9A1322",
            lw: "1",
            Gradient: true,
            Gradient_data:
              ST.STATE.player0.result < 0
                ? ["#DCFFE1", "#45F45E"]
                : ["#FFD9DD", "#FF6474"]
          });
          Utils.FN.DrawObj(ctx, ST, ["F_font_wt"], {
            str: "下 14 倍",
            xto: -200,
            yto: 416,
            size: 36,
            stroke: true,
            sc: "#804C22",
            lw: "1",
            Gradient: true,
            Gradient_data: ["#FFFDC9", "#E1DA28"]
          });

          break;

        default:
          break;
      }
      switch (ST.STATE.player0.animate) {
        case 0:
          Utils.FN.DrawObj(ctx, ST, [
            "I_py0_pkp_0",
            "I_py0_pkp_1",
            "I_py0_pkp_2"
          ]);
          break;

        default:
          break;
      }

      // 玩家1
      switch (ST.STATE.player1.status) {
        case 0:
          break;
        case 1:
          Utils.FN.DrawObj(ctx, ST, ["I_py1_bg_01", "I_py1_bg_02"]);
          ST.STATE.play_zhuang == 1 &&
            Utils.FN.DrawObj(ctx, ST, ["A_py_Banker"], {
              xto: 578,
              yto: 36
            });
          Utils.FN.DrawObj(ctx, ST, ["I_py1_face"]);
          Utils.FN.DrawObj(ctx, ST, ["F_font"], {
            str: ST.STATE.player1.name,
            xto: 670,
            yto: 100,
            size: 24,
            color: "#FFFFFF"
          });
          Utils.FN.DrawObj(ctx, ST, ["F_font"], {
            str: `￥${ST.STATE.player1.balance}`,
            xto: 660,
            yto: 266,
            size: 24,
            color: "#FFD385"
          });
          Utils.FN.DrawObj(ctx, ST, ["F_font_wt"], {
            str:
              ST.STATE.player1.result < 0
                ? ST.STATE.player1.result + ""
                : "+" + ST.STATE.player1.result,
            xto: 660,
            yto: 40,
            size: 36,
            stroke: true,
            sc: "#158138",
            lw: "1",
            Gradient: true,
            Gradient_data:
              ST.STATE.player1.result < 0
                ? ["#DCFFE1", "#45F45E"]
                : ["#FFD9DD", "#FF6474"]
          });
          Utils.FN.DrawObj(ctx, ST, ["F_font_wt"], {
            str: "下 14 倍",
            xto: 440,
            yto: 90,
            size: 36,
            stroke: true,
            sc: "#804C22",
            lw: "1",
            Gradient: true,
            Gradient_data: ["#FFFDC9", "#E1DA28"]
          });

          break;

        default:
          break;
      }
      switch (ST.STATE.player1.animate) {
        case 0:
          Utils.FN.DrawObj(ctx, ST, [
            "I_py1_pkp_0",
            "I_py1_pkp_1",
            "I_py1_pkp_2"
          ]);
          break;
        case 1:
          break;

        default:
          break;
      }

      // 玩家2
      switch (ST.STATE.player2.status) {
        case 0:
          break;
        case 1:
          Utils.FN.DrawObj(ctx, ST, ["I_py2_bg_01", "I_py2_bg_02"]);
          ST.STATE.play_zhuang == 2 &&
            Utils.FN.DrawObj(ctx, ST, ["A_py_Banker"], {
              xto: 578,
              yto: -266
            });
          Utils.FN.DrawObj(ctx, ST, ["I_py2_face"]);
          Utils.FN.DrawObj(ctx, ST, ["F_font"], {
            str: ST.STATE.player2.name,
            xto: 670,
            yto: -200,
            size: 24,
            color: "#FFFFFF"
          });
          Utils.FN.DrawObj(ctx, ST, ["F_font"], {
            str: `￥${ST.STATE.player2.balance}`,
            xto: 660,
            yto: -34,
            size: 24,
            color: "#FFD385"
          });
          Utils.FN.DrawObj(ctx, ST, ["F_font_wt"], {
            str:
              ST.STATE.player2.result < 0
                ? ST.STATE.player2.result + ""
                : "+" + ST.STATE.player2.result,
            xto: 660,
            yto: -260,
            size: 36,
            stroke: true,
            sc: "#158138",
            lw: "1",
            Gradient: true,
            Gradient_data:
              ST.STATE.player2.result < 0
                ? ["#DCFFE1", "#45F45E"]
                : ["#FFD9DD", "#FF6474"]
          });
          Utils.FN.DrawObj(ctx, ST, ["F_font_wt"], {
            str: "下 34 倍",
            xto: 440,
            yto: -210,
            size: 36,
            stroke: true,
            sc: "#804C22",
            lw: "1",
            Gradient: true,
            Gradient_data: ["#FFFDC9", "#E1DA28"]
          });

          break;

        default:
          break;
      }
      switch (ST.STATE.player2.animate) {
        case 0:
          Utils.FN.DrawObj(ctx, ST, [
            "I_py2_pkp_0",
            "I_py2_pkp_1",
            "I_py2_pkp_2"
          ]);
          break;
        case 1:
          break;

        default:
          break;
      }

      // 玩家3
      switch (ST.STATE.player3.status) {
        case 0:
          break;
        case 1:
          Utils.FN.DrawObj(ctx, ST, ["I_py3_bg_01", "I_py3_bg_02"]);
          ST.STATE.play_zhuang == 3 &&
            Utils.FN.DrawObj(ctx, ST, ["A_py_Banker"], {
              xto: -852,
              yto: -266
            });
          Utils.FN.DrawObj(ctx, ST, ["I_py3_face"]);
          Utils.FN.DrawObj(ctx, ST, ["F_font"], {
            str: ST.STATE.player3.name,
            xto: -760,
            yto: -200,
            size: 24,
            color: "#FFFFFF"
          });
          Utils.FN.DrawObj(ctx, ST, ["F_font"], {
            str: `￥${ST.STATE.player3.balance}`,
            xto: -770,
            yto: -34,
            size: 24,
            color: "#FFD385"
          });
          Utils.FN.DrawObj(ctx, ST, ["F_font_wt"], {
            str:
              ST.STATE.player3.result < 0
                ? ST.STATE.player3.result + ""
                : "+" + ST.STATE.player3.result,
            xto: -770,
            yto: -260,
            size: 36,
            stroke: true,
            sc: "#158138",
            lw: "1",
            Gradient: true,
            Gradient_data:
              ST.STATE.player3.result < 0
                ? ["#DCFFE1", "#45F45E"]
                : ["#FFD9DD", "#FF6474"]
          });
          Utils.FN.DrawObj(ctx, ST, ["F_font_wt"], {
            str: "下 34 倍",
            xto: -580,
            yto: -210,
            size: 36,
            stroke: true,
            sc: "#804C22",
            lw: "1",
            Gradient: true,
            Gradient_data: ["#FFFDC9", "#E1DA28"]
          });

          break;

        default:
          break;
      }
      switch (ST.STATE.player3.animate) {
        case 0:
          Utils.FN.DrawObj(ctx, ST, [
            "I_py3_pkp_0",
            "I_py3_pkp_1",
            "I_py3_pkp_2"
          ]);
          break;
        case 1:
          break;

        default:
          break;
      }

      // 玩家4
      switch (ST.STATE.player4.status) {
        case 0:
          break;
        case 1:
          Utils.FN.DrawObj(ctx, ST, ["I_py4_bg_01", "I_py4_bg_02"]);
          ST.STATE.play_zhuang == 4 &&
            Utils.FN.DrawObj(ctx, ST, ["A_py_Banker"], {
              xto: -852,
              yto: 36
            });
          Utils.FN.DrawObj(ctx, ST, ["I_py4_face"]);
          Utils.FN.DrawObj(ctx, ST, ["F_font"], {
            str: ST.STATE.player4.name,
            xto: -760,
            yto: 100,
            size: 24,
            color: "#FFFFFF"
          });
          Utils.FN.DrawObj(ctx, ST, ["F_font"], {
            str: `￥${ST.STATE.player4.balance}`,
            xto: -770,
            yto: 266,
            size: 24,
            color: "#FFD385"
          });
          Utils.FN.DrawObj(ctx, ST, ["F_font_wt"], {
            str:
              ST.STATE.player4.result < 0
                ? ST.STATE.player4.result + ""
                : "+" + ST.STATE.player4.result,
            xto: -770,
            yto: 40,
            size: 36,
            stroke: true,
            sc: "#158138",
            lw: "1",
            Gradient: true,
            Gradient_data:
              ST.STATE.player4.result < 0
                ? ["#DCFFE1", "#45F45E"]
                : ["#FFD9DD", "#FF6474"]
          });
          Utils.FN.DrawObj(ctx, ST, ["F_font_wt"], {
            str: "下 34 倍",
            xto: -580,
            yto: 90,
            size: 36,
            stroke: true,
            sc: "#804C22",
            lw: "1",
            Gradient: true,
            Gradient_data: ["#FFFDC9", "#E1DA28"]
          });

          break;

        default:
          break;
      }
      switch (ST.STATE.player4.animate) {
        case 0:
          Utils.FN.DrawObj(ctx, ST, [
            "I_py4_pkp_0",
            "I_py4_pkp_1",
            "I_py4_pkp_2"
          ]);
          break;
        case 1:
          0;
          break;

        default:
          break;
      }

      // 全局动画
      switch (ST.STATE.animate) {
        case 0:
          break;
        case 1:
          Utils.FN.DrawObj(ctx, ST, ["I_py_zhuang"], ST.zhuang_position[4]);
          break;
        case 5:
        let deal_1 = _that.pkp_animate(); // 执行发牌动作
        if (deal_1) {
          // for (let i = 0; i < ST.PKP.player0.length; i++) {
          //   ST.PKP.obj[ST.PKP.player0[i]].anistate = 2;
          // }
          // ST.STATE.player0.animate = 6;
          ST.STATE.animate = 0;
        }
          break;
        default:
          break;
      }

      // 绘制公告条
      imadata_left = ctx.getImageData(
        0,
        120 * ST.CS,
        ST.CW / 2 + 330 * ST.CS,
        76 * ST.CS
      );
      imadata_right = ctx.getImageData(
        ST.CW / 2 + 850 * ST.CS,
        120 * ST.CS,
        ST.CW / 2 - 540 * ST.CS + 10,
        76 * ST.CS
      );
      // 文字绘制
      Utils.FN.DrawObj(ctx, ST, ["F_top_tips"], {
        str:
          "拉什福德后我去额呼入王企鹅号日王企鹅号人拉什福德后我去额呼入王企鹅号日王企鹅号人drfthgrtge rterger拉什福德后我去额呼入王企鹅号日王企鹅号人",
        size: 24,
        xto: 850,
        ytt: 142,
        color: "#FFFFFF"
      });
      // 遮罩图片绘制
      ctx.putImageData(imadata_left, 0, 120 * ST.CS);
      ctx.putImageData(imadata_right, ST.CW / 2 + 850 * ST.CS, 120 * ST.CS);
      // 公告条绘制结束

      // 绘制遮罩层
      if (ST.STATE.popup) {
        Utils.FN.DrawObj(ctx, ST, ["I_shade_30"], {
          uiw: ST.CW / ST.CS, // 全屏宽度
          uih: ST.CH / ST.CS, // 全屏高度
          xtl: 0,
          ytt: 0
        });
        switch (ST.STATE.popup) {
          case 0:
            break;
          case 1:
            // 游戏进行中加载提示
            ctx.beginPath();
            ctx.lineWidth = 10;
            ctx.strokeStyle = loding_data.color_1;
            ctx.arc(ST.CW / 2, ST.CH / 2, 40, 0, Math.PI * 2, true); //画圆
            ctx.stroke();
            ctx.beginPath();
            ctx.lineWidth = 10;
            ctx.strokeStyle = loding_data.color_2;
            ctx.lineCap = "round";
            ctx.arc(
              ST.CW / 2,
              ST.CH / 2,
              40,
              (Math.PI * -1) / 2,
              (Math.PI * -1) / 2 + Math.PI * 2 * (loding_data.endAngle / 100),
              false
            ); //画弧
            ctx.stroke();
            loding_data.endAngle += 1000 / ST.FPS;
            if (loding_data.endAngle >= 100) {
              loding_data.endAngle = 0;
              loding_data.color_aign = !loding_data.color_aign;
              loding_data.color_1 = loding_data.color_aign
                ? "#0D1F37"
                : "#F0EE01";
              loding_data.color_2 = loding_data.color_aign
                ? "#F0EE01"
                : "#0D1F37";
            }
            break;
          case 2:
            // 游戏退出提示
            Utils.FN.DrawObj(ctx, ST, ["I_pups_bg"]);
            Utils.FN.DrawObj(ctx, ST, ["A_pups_close", "I_pups_close"], {
              xto: 360,
              yto: -306
            });
            Utils.FN.DrawObj(ctx, ST, ["I_btn_cancel"]);
            Utils.FN.DrawObj(ctx, ST, ["I_btn_yes"], {
              xto: -175,
              yto: 90
            });
            Utils.FN.DrawObj(ctx, ST, ["F_font"], {
              str: "确定要退出游戏吗？",
              xto: -160,
              yto: -60,
              size: 36,
              color: "#333333"
            });
            break;
          case 3:
            // 正在游戏中退出提示
            Utils.FN.DrawObj(ctx, ST, ["I_pups_bg"]);
            Utils.FN.DrawObj(ctx, ST, ["I_btn_yes"], {
              xto: -75,
              yto: 90
            });
            Utils.FN.DrawObj(ctx, ST, ["F_font"], {
              str: "游戏中禁止退出，先打完这局哦~",
              xto: -240,
              yto: -60,
              size: 36,
              color: "#333333"
            });
            break;
          case 11:
            // 游戏退出提示
            Utils.FN.DrawObj(ctx, ST, ["I_result_bg"]);
            Utils.FN.DrawObj(ctx, ST, ["A_pups_close", "I_pups_close"], {
              xto: 582,
              yto: -346
            });
            Utils.FN.DrawObj(ctx, ST, ["F_font"], {
              str:
                ST.STATE.play_zhuang == 0
                  ? `庄      ${ST.STATE.player0.name}`
                  : ST.STATE.player0.name,
              xto: ST.STATE.play_zhuang == 0 ? -540 : -480,
              yto: -110,
              size: 24,
              color: ST.STATE.play_zhuang == 0 ? "#E90000" : "#722B01"
            });
            Utils.FN.DrawObj(ctx, ST, ["F_font"], {
              str: _that.curr_room.name,
              xto: -190,
              yto: -110,
              size: 24,
              color: ST.STATE.play_zhuang == 0 ? "#E90000" : "#722B01"
            });
            Utils.FN.DrawObj(ctx, ST, ["F_font"], {
              str: ST.STATE.player0.doubling,
              xto: 142,
              yto: -110,
              size: 24,
              color: ST.STATE.play_zhuang == 0 ? "#E90000" : "#722B01"
            });
            Utils.FN.DrawObj(ctx, ST, ["F_font"], {
              str:
                ST.STATE.player0.result > 0
                  ? `+${ST.STATE.player0.result}`
                  : ST.STATE.player0.result,
              xto: 430,
              yto: -110,
              size: 24,
              color:
                ST.STATE.play_zhuang == 0
                  ? "#E90000"
                  : ST.STATE.player0.result < 0
                  ? "#3A960D"
                  : "#722B01"
            });

            Utils.FN.DrawObj(ctx, ST, ["F_font"], {
              str:
                ST.STATE.play_zhuang == 1
                  ? `庄      ${ST.STATE.player1.name}`
                  : ST.STATE.player1.name,
              xto: ST.STATE.play_zhuang == 1 ? -540 : -480,
              yto: -40,
              size: 24,
              color: ST.STATE.play_zhuang == 1 ? "#E90000" : "#722B01"
            });
            Utils.FN.DrawObj(ctx, ST, ["F_font"], {
              str: _that.curr_room.name,
              xto: -190,
              yto: -40,
              size: 24,
              color: ST.STATE.play_zhuang == 1 ? "#E90000" : "#722B01"
            });
            Utils.FN.DrawObj(ctx, ST, ["F_font"], {
              str: ST.STATE.player1.doubling,
              xto: 142,
              yto: -40,
              size: 24,
              color: ST.STATE.play_zhuang == 1 ? "#E90000" : "#722B01"
            });
            Utils.FN.DrawObj(ctx, ST, ["F_font"], {
              str:
                ST.STATE.player1.result > 0
                  ? `+${ST.STATE.player1.result}`
                  : ST.STATE.player1.result,
              xto: 430,
              yto: -40,
              size: 24,
              color:
                ST.STATE.play_zhuang == 1
                  ? "#E90000"
                  : ST.STATE.player1.result < 0
                  ? "#3A960D"
                  : "#722B01"
            });

            Utils.FN.DrawObj(ctx, ST, ["F_font"], {
              str:
                ST.STATE.play_zhuang == 2
                  ? `庄      ${ST.STATE.player2.name}`
                  : ST.STATE.player2.name,
              xto: ST.STATE.play_zhuang == 2 ? -540 : -480,
              yto: 30,
              size: 24,
              color: ST.STATE.play_zhuang == 2 ? "#E90000" : "#722B01"
            });
            Utils.FN.DrawObj(ctx, ST, ["F_font"], {
              str: _that.curr_room.name,
              xto: -190,
              yto: 30,
              size: 24,
              color: ST.STATE.play_zhuang == 2 ? "#E90000" : "#722B01"
            });
            Utils.FN.DrawObj(ctx, ST, ["F_font"], {
              str: ST.STATE.player2.doubling,
              xto: 142,
              yto: 30,
              size: 24,
              color: ST.STATE.play_zhuang == 2 ? "#E90000" : "#722B01"
            });
            Utils.FN.DrawObj(ctx, ST, ["F_font"], {
              str:
                ST.STATE.player2.result > 0
                  ? `+${ST.STATE.player2.result}`
                  : ST.STATE.player2.result,
              xto: 430,
              yto: 30,
              size: 24,
              color:
                ST.STATE.play_zhuang == 2
                  ? "#E90000"
                  : ST.STATE.player2.result < 0
                  ? "#3A960D"
                  : "#722B01"
            });

            Utils.FN.DrawObj(ctx, ST, ["F_font"], {
              str:
                ST.STATE.play_zhuang == 3
                  ? `庄      ${ST.STATE.player3.name}`
                  : ST.STATE.player3.name,
              xto: ST.STATE.play_zhuang == 3 ? -540 : -480,
              yto: 100,
              size: 24,
              color: ST.STATE.play_zhuang == 3 ? "#E90000" : "#722B01"
            });
            Utils.FN.DrawObj(ctx, ST, ["F_font"], {
              str: _that.curr_room.name,
              xto: -190,
              yto: 100,
              size: 24,
              color: ST.STATE.play_zhuang == 3 ? "#E90000" : "#722B01"
            });

            Utils.FN.DrawObj(ctx, ST, ["F_font"], {
              str: ST.STATE.player3.doubling,
              xto: 142,
              yto: 100,
              size: 24,
              color: ST.STATE.play_zhuang == 3 ? "#E90000" : "#722B01"
            });
            Utils.FN.DrawObj(ctx, ST, ["F_font"], {
              str:
                ST.STATE.player3.result > 0
                  ? `+${ST.STATE.player3.result}`
                  : ST.STATE.player3.result,
              xto: 430,
              yto: 100,
              size: 24,
              color:
                ST.STATE.play_zhuang == 3
                  ? "#E90000"
                  : ST.STATE.player3.result < 0
                  ? "#3A960D"
                  : "#722B01"
            });
            Utils.FN.DrawObj(ctx, ST, ["I_btn_continue"], {
              xto: -135,
              yto: 210
            }); // 继续游戏按钮
            break;
          default:
            break;
        }
      }

      // 当窗口尺寸调整 或者状态改变时 保存为图片 当做canvas父级盒子的背景图，在缩放时减小屏闪
      if (
        computeScale !== _that.Base.watchScale ||
        computeState !== ST.STATE.step
      ) {
        _that.changeBg();
        computeScale = _that.Base.watchScale;
        computeState = ST.STATE.step;
      }
    }, ST.FPS);

    // 初始化玩家数据
    Utils.FN.ObMaping(this.Store.CVDATA, CreateObj(this.Store.component));

    Utils.FN.ObMaping(this.Store.CVDATA, CreateObj(this.Store.py0));

    Utils.FN.ObMaping(this.Store.CVDATA, CreateObj(this.Store.py0_pkp));

    Utils.FN.ObMaping(this.Store.CVDATA, CreateObj(this.Store.py1));

    Utils.FN.ObMaping(this.Store.CVDATA, CreateObj(this.Store.py1_pkp));

    Utils.FN.ObMaping(this.Store.CVDATA, CreateObj(this.Store.py2));

    Utils.FN.ObMaping(this.Store.CVDATA, CreateObj(this.Store.py2_pkp));

    Utils.FN.ObMaping(this.Store.CVDATA, CreateObj(this.Store.py3));

    Utils.FN.ObMaping(this.Store.CVDATA, CreateObj(this.Store.py3_pkp));

    Utils.FN.ObMaping(this.Store.CVDATA, CreateObj(this.Store.py4));

    Utils.FN.ObMaping(this.Store.CVDATA, CreateObj(this.Store.py4_pkp));

    ST.PKP = this.create_pkp(15); // 创建扑克牌数据
    _that.set_pkp_animate();
    // 将扑克牌对象映射到 this.Store.CVDATA ！！！！！！
    Utils.FN.ObMaping(this.Store.CVDATA, this.Store.PKP.obj);
    // 初始扑克牌显示位置
    // for (let i = 0; i < this.Store.PKP.arr.length; i++) {
    //   const name = this.Store.PKP.arr[i];
    //   this.Store.PKP.obj[name].xto = i * -10 + 260;
    // }
  }

  // 更改背景图片
  public changeBg() {
    this.Base.Pagebg = this.ctxele.toDataURL();
  }

  public canvasclick(e) {
    let _that = this;

    let ME = { x: e.offsetX, y: e.offsetY };
    let evdata = _that.Store.EVENT;
    if (evdata.length) {
      for (let i = evdata.length - 1; i >= 0; i--) {
        let o = evdata[i];
        if (o.ob.name.indexOf("I_shade") === -1) {
          // 遮罩层
          if (o.s == "rect") {
            // 矩形
            if (ME.x > o.x && ME.x < o.xl && ME.y > o.y && ME.y < o.yl) {
              o.ob.eventdata.click &&
                o.ob.eventdata.click(_that.Store, function() {
                  console.log("点击了矩形 :", o.ob);

                  // 触发点击音效
                  if (o.ob.name.indexOf("pkp") !== -1) {
                    // 点击扑克牌音效
                    Utils.FN.play_game_music(
                      _that.Base.Music.game_music.doms,
                      "../../../../assets/media/qzniu/dianjipai.mp3"
                    );
                  } else {
                    Utils.FN.play_game_music(
                      _that.Base.Music.game_music.doms,
                      "../../../../assets/media/qzniu/anniu.mp3"
                    );
                  }

                  // 如果点击了继续游戏
                  if (o.ob.name == "I_btn_continue") {
                    _that.init();
                  }
                });
              return false;
            }
          } else {
            // 圆形
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
              return false;
            }
          }
        } else {
          return false;
        }
      }
    }
  }

  // 扑克牌逻辑
  // 设置扑克牌名称 '01a'代表 方块1   '12d'代表 黑桃Q
  public set_pkpName() {
    let ab = ["a", "b", "c", "d"];
    let names = [];
    for (let i = 1; i <= 13; i++) {
      let n = i < 10 ? "0" + i : "" + i;
      for (let q = 1; q <= 4; q++) {
        let m = n + ab[q - 1];
        names.push(m);
      }
    }
    names.push("back"); // 扑克背面
    return names;
  }

  // 设置扑克牌 图片
  public set_pkpImg(arr) {
    let imgs = {};
    for (let i = 0; i < arr.length; i++) {
      let img = new Image();
      img.src = "../../../../assets/images/sang/room/pkp/" + arr[i] + ".png";
      imgs[arr[i]] = img;
    }
    return imgs;
  }

  // 创建发牌对象
  public create_pkp(n) {
    const OB = {
      arr: [],
      obj: {}
    };
    let o = {
      type: "IMG",
      src: "../../../../assets/images/sang/room/pkp/back.png",
      uiw: 118,
      uih: 150,
      xto: -58,
      yto: -50,
      aniconfig: function(o, fps) {
        switch (o.anistate) {
          case 0:
            break;
          case 1:
            let win1 = o.transition(
              [
                ["xto", o.store.orxto, o.store.xto, 500],
                ["yto", o.store.oryto, o.store.yto, 500]
              ],
              fps
            );
            win1 && (o.anistate = 0);
            break;
          case 2:
            let win2 = o.transition(
              [
                ["xto", o.store.xto, o.origin.xto, 300],
                ["yto", o.store.yto, o.origin.yto, 300]
              ],
              fps
            );
            win2 && (o.anistate = 0)
            break;

          default:
            break;
        }
      }
    };
    for (let i = 0; i < n; i++) {
      let name = "I_pkp_" + i;
      OB.obj[name] = new CVIMG(o);
      OB.arr.push(name);
    }
    return OB;
  }

  // 配置发牌数据
  public set_pkp_animate() {
    let pkp = this.Store.PKP;
    pkp["player0"] = [];
    pkp["player1"] = [];
    pkp["player2"] = [];
    pkp["player3"] = [];
    pkp["player4"] = [];
    for (let i = 0; i < 15; i++) {
      let n = i + this.Store.STATE.play_zhuang; // 从庄家开始发牌
      let p = pkp.arr[pkp.arr.length - 1 - i];
      let q = Math.floor(i / 5);
      let name = "player" + (n % 5);
      pkp.obj[p].store = this.Store.PkpGroup[name].site[q];
      pkp.obj[p].store["orxto"] = pkp.obj[p].xto;
      pkp.obj[p].store["oryto"] = pkp.obj[p].yto;
      pkp[name].push(p);
      pkp.obj[p].origin = this.Store.PkpGroup[name].origin;
    }
    console.log(pkp);
  }

  // 发牌
  public pkp_animate() {
    let pkp = this.Store.PKP;
    // let a = pkp.arr[pkp.arr.length - 1];
    // pkp.obj[a].anistate = 1;
    for (let i = 0; i < pkp.arr.length; i++) {
      let a = pkp.arr[i];
      pkp.obj[a].anistate = 1;
    }
    return false;
  }

  //  设置扑克牌面图片，计算牌面值
  public set_pkp_option(arr, attr, data) {
    for (let i = 0; i < arr.length; i++) {
      let name = arr[i];
      let value = data[i];
      if (name && value) {
        this.Store.CVDATA[name].setattr(attr, this.Store.PKP_img[value]);
      }
      if (attr == "img" && data[i] !== "back") {
        let v = parseInt(data[i]);
        v = v < 10 ? v : 10;
        Object.assign(this.Store.CVDATA[name].store, { value: v });
      }
    }
  }

  // 设置开牌时牌型 （牛几） 图片
  public set_niuImg() {
    let data = [];
    for (let i = 0; i < 15; i++) {
      let img = new Image();
      img.src =
        "../../../../assets/images/qzniu/room/result_niu/result_niu_" +
        i +
        ".png";
      data.push(img);
    }
    return data;
  }

  // 设置玩家头像 图片 TODO： 临时
  public set_faceImg() {
    let data = [];
    for (let i = 0; i < 10; i++) {
      let img = new Image();
      img.src = "../../../../assets/images/common/head_imgs/face_" + i + ".png";
      data.push(img);
    }
    return data;
  }
}
