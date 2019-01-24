import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class BaseService {
  constructor() {}

  // window config
  public uiwidth: number = 0; // 设计稿宽度
  public uiheight: number = 0; // 设计稿高度
  public PageWidth: number = 0; // 页面宽度
  public PageHeight: number = 0; // 页面高度
  public DirectionX: Boolean = true; // 显示方向
  public canvasWidth: number = 0; // 画布宽度
  public canvasHeight: number = 0; // 画布高度
  public scaleX: number = this.PageWidth / this.uiwidth; // 宽度缩放比
  public scaleY: number = this.PageHeight / this.uiheight; // 高度缩放比
  public scale: number = this.scaleY; // 画布内容实际需要缩放比

  public page_loding: boolean = false;
  public Pagebg: any = ""; // 页面背景图
  public page_audio_src = "../../assets/media/home.mp3"; // 页面背景音乐

  public watchScale: number = 0; // 监听缩放比例变化

  public Popup_Page = 0; // 弹窗页面

  // 背景音乐和游戏音乐数据
  public Music = {
    bg_music: {
      dom: null, // 页面背景音乐元素（<audio>元素）
      switch: true,
      value: 0.5
    },
    game_music: {
      dom: null, // 游戏主要动画音乐元素（<audio>元素
      players: [], // 游戏玩家动画 音乐元素集合（<audio>元素集合）
      switch: true,
      value: 0.6
    }
  };

  // 页面窗口尺寸改变重新初始化window
  public initWidow() {
    // 获取窗口宽高
    let w: number, h: number;
    if (window.innerWidth) {
      w = window.innerWidth;
    } else if (document.body && document.body.clientWidth) {
      w = document.body.clientWidth;
    }
    if (window.innerHeight) {
      h = window.innerHeight;
    } else if (document.body && document.body.clientHeight) {
      h = document.body.clientHeight;
    }

    // 设置全局基础数据
    this.PageWidth = w;
    this.PageHeight = h;
    this.DirectionX = h > w ? false : true;
    this.canvasWidth = this.DirectionX ? this.PageWidth : this.PageHeight;
    this.canvasHeight = this.DirectionX ? this.PageHeight : this.PageWidth;
    this.scaleX = this.canvasWidth / this.uiwidth;
    this.scaleY = this.canvasHeight / this.uiheight;
    let s = this.canvasWidth / this.canvasHeight;
    if (s <= 1.4 && s >= 0.6) {
      this.scale = this.scaleY * (Math.abs(1 - s) + 0.6);
    } else {
      this.scale = this.scaleY;
    }

    // 设置html 的fontSize属性 等比例缩放非canvas页面内容
    window.document.documentElement.style.fontSize = this.scale * 200 + "px";

    this.watchScale++; // 监听窗口尺寸是否更改
  }

  // user config
  public userinfo = {
    balance: 8888.88,
    token: "",
    user_id: 0,
    user_name: "",
    nick_name: "vip"
  };
}
