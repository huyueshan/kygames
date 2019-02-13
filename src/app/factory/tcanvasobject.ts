
// 计算 基础对象
export class CVBASIC {
  type?: string; // 对象类型 可以设置的值：BASIC, IMG, ANIMATED, FONT, GRAPH 自动类自定义，
  name?: string; // 对象名称 继承初始化对象的键名

  // 尺寸
  w?: number; // 绘制对象宽度
  h?: number; // 绘制对象高度
  uiw?: number; // 图片设计宽度
  uih?: number; // 图片设计高度
  curscale?: number; // 当前画面缩放比例

  // 坐标
  x?: number; // x坐标
  y?: number; // y坐标
  xto?: number | null; // 设计稿 图片以中心点定位的x轴相对距离  ** 定位new 对象时传一种定位方式就可以了
  yto?: number | null; // 设计稿 图片以中心点定位的y轴相对距离  ** 定位优先级： 中心点 左上  右下
  xtl?: number | null; // 设计稿 图片以左侧定位x轴相对距离
  ytt?: number | null; // 设计稿 图片以顶部定位y轴相对距离
  xtr?: number | null; // 设计稿 图片以右侧定位x轴相对距离
  ytb?: number | null; // 设计稿 图片以底部定位y轴相对距离

  // 动画
  dopen?: boolean; // 是否延迟开始
  dclose?: boolean; // 是否延迟结束
  delaystate?: number; // 当前延迟状态 用于控制延迟
  delayconfig?: any; // 延迟配置 {open: number | number[] , close: number | number[]} 如果值是一个数组的话取数组数组之间的一个随机数，比如[1,100] 取1到100之间的随机数 ms

  translateX?: number; // x轴位移距离
  translateY?: number; // y轴位移距离
  scaling?: number; // 缩放比例
  rotate?: number; // 旋转角度
  anistate?: number; // 当前动画状态 用于在配置动画中设定不同的状态
  aniconfig?: any; // 配置动画：一个包含 fn:function(){} 的对象

  timerdata?: any; //计时器数据，不用自主配置

  // 存储
  store: object; // 存储对象需要的任意对象类型的数据

  // 事件
  event?: boolean; // 是否绑定事件
  eventdata?: object | null; // 事件数据：比如 {‘click':function(){}, 'keydown':... }
  padding?: number; // 图片周边不需要出发事件的距离

  shape?: string; // 绘制后的形状。默认矩形'rect'，可设置为圆形 “circle”

  show?: boolean; // 是否显示

  constructor(data: any) {
    this.type = "BASIC";
    this.name = "";

    this.w = data.w ? data.w : 0;
    this.h = data.h ? data.h : 0;
    this.uiw = data.uiw ? data.uiw : 0;
    this.uih = data.uih ? data.uih : 0;

    this.x = data.x ? data.x : 0;
    this.y = data.y ? data.y : 0;
    this.xto = data.xto || data.xto === 0 ? data.xto : null;
    this.yto = data.yto || data.yto === 0 ? data.yto : null;
    this.xtl = data.xtl || data.xtl === 0 ? data.xtl : null;
    this.ytt = data.ytt || data.ytt === 0 ? data.ytt : null;
    this.xtr = data.xtr || data.xtr === 0 ? data.xtr : null;
    this.ytb = data.ytb || data.ytb === 0 ? data.ytb : null;
    this.curscale = JSON.stringify(data.curscale) ? data.curscale : 1;

    this.dopen = data.dopen ? data.dopen : false;
    this.dclose = data.dclose ? data.dclose : false;
    this.delaystate = 0;
    this.delayconfig = data.delayconfig ? data.delayconfig : null;

    this.translateX = JSON.stringify(data.translateX) ? data.translateX : 0;
    this.translateY = JSON.stringify(data.translateY) ? data.translateY : 0;
    this.scaling = JSON.stringify(data.scaling) ? data.scaling : 1;
    this.rotate = JSON.stringify(data.rotate) ? data.rotate : 0;

    this.anistate = JSON.stringify(data.anistate) ? data.anistate : 0;
    this.aniconfig = data.aniconfig ? data.aniconfig : null;

    this.timerdata = { state: 0, counter: 0 };
    this.store = data.store ? Object.assign({}, data.store) : {};

    this.event = data.event ? data.event : false;
    this.eventdata = data.eventdata ? data.eventdata : null;

    this.padding = data.padding ? data.padding : 0;
    this.shape = data.shape ? data.shape : "rect";

    this.show = JSON.stringify(data.show) ? data.show : true;
  }

  // scale: 缩放比例, docw: 画布宽度, doch: 画布高度， fps:页面刷新时间,
  set(scale: number, docw: number, doch: number, fps: number) {
    this.curscale = scale;

    this.w = this.uiw * scale;
    this.h = this.uih * scale;

    this.x =
      this.xto !== null
        ? this.xto * scale + docw / 2
        : this.xtl !== null
        ? this.xtl * scale
        : this.xtr !== null
        ? docw - this.xtr * scale
        : this.x;
    this.y =
      this.yto !== null
        ? this.yto * scale + doch / 2
        : this.ytt !== null
        ? this.ytt * scale
        : this.ytb !== null
        ? doch - this.ytb * scale
        : this.y;

    // 配置变形数据
    if (this.aniconfig !== null && typeof this.aniconfig == "function") {
      this.aniconfig(this, fps);
    }

    // 计算变形后的参数
    this.x += this.translateX * scale + (this.w - this.w * this.scaling) / 2;
    this.y += this.translateY * scale + (this.h - this.h * this.scaling) / 2;
    this.w = this.w * this.scaling;
    this.h = this.h * this.scaling;
  }

  // 获取当前对象画制区域坐标 x,y: 起点坐标  xl,yl:终点坐标  s:区域形状 默认矩形
  getposition() {
    let p = this.padding * this.curscale || 0;
    return {
      x: this.x + p,
      y: this.y + p,
      xl: this.x + this.w - p,
      yl: this.y + this.h - p,
      s: this.shape
    };
  }
  // 延迟显示 延迟时间为delayconfig.open设置的ms数时间，开启需对dopen属性设为true
  delayopen(fps) {
    if (this.dopen && this.delayconfig !== null) {
      let open = this.delayconfig.open;
      if (Array.isArray(open)) {
        open = Math.floor(Math.random() * (open[1] - open[0] + 1) + open[0]);
      } else {
        open = Number(open);
      }
      this.delaystate += fps / open;
      if (this.delaystate >= 1) {
        this.dopen = false;
        this.delaystate = 0;
      }
    }
  }
  // 自动关闭 将在delayconfig.close设置的ms数时间后关闭，开启需对dclose属性设为true
  delayclose(fps) {
    if (this.dclose && this.delayconfig !== null) {
      let close = this.delayconfig.close;
      if (Array.isArray(close)) {
        close = Math.floor(
          Math.random() * (close[1] - close[0] + 1) + close[0]
        );
      } else {
        close = Number(close);
      }
      this.delaystate += fps / close;
      if (this.delaystate >= 1) {
        this.delaystate = 0;
        this.show = false;
      }
    }
  }
  // 对象变形动画  data传入一组数组对象
  // 示例： data[0]=[变形对象(string),开始值(number),结束值值(number),变形完成时间(number)]
  // step 设置每次变形的数值，如果传step参数，就优先按照每次变形值来变换，否则按照完成时间来变换
  transition(data = [], fps, step: number = 0) {
    if (data.length === 0) {
      return true;
    }
    let result = [];
    for (let i = 0; i < data.length; i++) {
      result[i] = false;
      let o = this;
      let item = data[i];
      let tv = o[item[0]];
      let z = step ? (step * fps) / 100 : (item[2] - item[1]) / (item[3] / fps);
      tv += z;
      tv =
        item[2] <= item[1]
          ? tv <= item[2]
            ? item[2]
            : tv
          : tv >= item[2]
          ? item[2]
          : tv;
      o[item[0]] = tv;
      result[i] = tv === item[2] ? true : false;
    }
    return !result.includes(false);
  }

  // 设置对象自身属性
  setattr(attr, value) {
    let o = this;
    if (o[attr] !== undefined && typeof o[attr] == typeof value) {
      o[attr] = value;
    } else {
      throw console.error(
        `${value}: ${typeof value} 类型不能赋值给 ${typeof o[attr]} 类型`
      );
    }
  }

  // 计时器，进行中返回false， 结束后返回true
  tiemrs(time, fps) {
    let t = this.timerdata;
    if (t.state || t.counter == 0) {
      t.counter += fps / time;
      if (t.counter >= 1) {
        t.counter = 0;
        t.state = 0;
        return true;
      } else {
        t.state = 1;
        return false;
      }
    }
    return false;
  }
}

// 基本绘制图片类型
export class CVIMG extends CVBASIC {
  img?: Object | any; // image对象
  src?: String; // 图片地址
  constructor(data: any) {
    super(data);
    this.type = "IMG";

    this.img = new Image();
    this.src = data.src ? data.src : "";
    this.img.src = this.src;
  }

  //  scale: 缩放比例, docw: 画布宽度, doch: 画布高度， fps: 动画执行频率 页面刷新时间/动画切换频率时间
  init(scale: number, docw: number, doch: number, fps: number = 100) {
    this.set(scale, docw, doch, fps);
    if (this.dclose) {
      this.delayclose(fps);
    }
  }
}

// 基本动画对象
export class CVANIMAT extends CVBASIC {
  img?: Object | any; // 动画当前image对象
  src?: String; // 当前动画组图片地址 图片名不包含图片下标数和后缀名
  imglist: object = [];
  currindex: number; // 当前动画帧下标
  imgsuf: string; // 图片后缀名 默认'.png'
  length: number; // 动画图片帧数
  step: number; // 动画帧间隔时间 毫秒
  regain: number; // 循环动画帧起始图片下标 默认0
  computeindex: number; // 通过绘制刷新帧率计算当前下标计算值 可以设置此值决定动画起始帧图片
  doauto?: boolean; // 动画自动循环
  animationce?: boolean; // 执行一轮动画

  danimate?: boolean; // 动画延迟
  danimatestate?: number; // 当前延迟状态 用于控制延迟
  danimateconfig?: any; // 延迟配置  number | number[] 如果值是一个数组的话取数组数组之间的一个随机数，比如[1,100] 取1到100之间的随机数 ms
  constructor(data: any) {
    super(data);
    this.type = "ANIMATED";

    this.src = data.src ? data.src : "";
    this.imgsuf = data.imgsuf ? data.imgsuf : ".png";
    this.length = data.length ? data.length : 1;
    this.currindex = data.currindex ? data.currindex : 0;
    this.step = data.step ? data.step : 45;
    this.regain = data.regain ? data.regain : 0;
    this.animationce = JSON.stringify(data.animationce)
      ? data.animationce
      : false;
    this.doauto = JSON.stringify(data.doauto) ? data.doauto : false;
    this.computeindex = data.computeindex ? data.computeindex : 0;
    this.danimate = data.danimate ? data.danimate : false;
    this.danimatestate = 0;
    this.danimateconfig = data.danimateconfig ? data.danimateconfig : null;
    this.setanimt();
  }

  // 设置动画帧图片
  setanimt() {
    for (let i = 0; i < this.length; i++) {
      this.imglist[i] = new Image();
      this.imglist[i].src = this.src + i.toString() + this.imgsuf;
    }
  }

  //  scale: 缩放比例, docw: 画布宽度, doch: 画布高度， fps: 动画执行频率 页面刷新时间/动画切换频率时间
  init(scale: number, docw: number, doch: number, fps: number = 100) {
    this.set(scale, docw, doch, fps);
    this.img = this.imglist[this.currindex];

    // 执行图片帧播放动画
    if (this.doauto) {
      if (this.currindex == 0 && this.danimate) {
        this.delayani(fps);
      } else {
        this.computeindex += fps / this.step;
        if (Math.floor(this.computeindex) < this.length) {
          this.currindex = Math.floor(this.computeindex);
        } else {
          this.computeindex = this.computeindex - this.length;
          this.currindex = this.regain;
          if (this.animationce) {
            this.currindex = 0;
            this.show = false; // 如果设置只执行一次的话执行完毕就不显示，再次调用值设置为true;
          }
          if (this.danimateconfig !== null) {
            this.danimate = true;
          }
        }
      }
    }
  }

  // 延迟动画
  delayani(fps) {
    if (this.danimate && this.danimateconfig !== null) {
      let da;
      if (Array.isArray(this.danimateconfig)) {
        da= [...this.danimateconfig];
        da = Math.floor(Math.random() * (da[1] - da[0] + 1) + da[0]);
      } else {
        da = Number(this.danimateconfig);
      }
      this.danimatestate += fps / da;
      if (this.danimatestate >= 1) {
        this.danimate = false;
        this.danimatestate = 0;
      }
    }
  }
}

export class CVFONT extends CVBASIC {
  f?: string; // 文字字体
  c?: string; // 文字颜色
  wt?: string; // 文字粗细
  sc?: string; // 外轮廓颜色
  lw?: string; // 外轮廓宽度
  s?: number; // 缩放计算后字体大小
  size?: number; // 用户设置字体大小
  str?: string; // 绘制的文字
  stroke?: boolean; // 是否外轮廓 默认false

  Gradient?: boolean; //是否使用渐变 目前只设置填充渐变 后续可增加
  Gradient_style?: string; //是否使用渐变类型 暂时只支持'ttb' 从上往下 后续可增加
  Gradient_data?: any; //渐变颜色数据 目前传入一个数组，根据数组length自动配置渐变颜色

  constructor(data: any) {
    super(data);
    this.type = "FONT";

    this.f = data.f ? data.f : "arial";
    this.c = data.c ? data.c : "#000000";
    this.wt = data.wt ? data.wt : "normal";
    this.sc = data.sc ? data.sc : "#FFFFFF";
    this.lw = data.lw ? data.lw : "2";
    this.size = data.size ? data.size : 12;
    this.str = data.str ? data.str : "";
    this.stroke = data.stroke ? data.stroke : false;
    this.Gradient = data.Gradient ? data.Gradient : false;
    this.Gradient_style = data.Gradient_style ? data.Gradient_style : "ttb";
    this.Gradient_data = data.Gradient_data ? data.Gradient_data : [];
  }

  //  scale: 缩放比例, docw: 画布宽度, doch: 画布高度， fps: 动画执行频率 页面刷新时间/动画切换频率时间
  init(scale: number, docw: number, doch: number, fps: number = 100) {
    this.set(scale, docw, doch, fps);
    this.s = this.size * scale;
    this.y += this.s; // 文字y轴也以左上角位置定位
    this.h = this.s;
    this.w = this.str.toString().length * this.s;
    if (this.dclose) {
      this.delayclose(fps);
    }
  }
}

export class CVGRAPH extends CVBASIC {
  fc?: string; // 填充颜色
  sc?: string; // 笔触颜色
  lw?: string; //线条宽度
  fill?: boolean; // 是否填充绘画 默认笔触绘制

  constructor(data: any) {
    super(data);
    this.type = "GRAPH";

    this.fc = data.fc ? data.fc : "#FFFFFF";
    this.sc = data.sc ? data.sc : "#000000";
    this.lw = data.lw ? data.lw : "2";
    this.fill = data.fill ? data.fill : false;
  }

  //  scale: 缩放比例, docw: 画布宽度, doch: 画布高度， fps: 动画执行频率 页面刷新时间/动画切换频率时间
  init(scale: number, docw: number, doch: number, fps: number = 100) {
    this.set(scale, docw, doch, fps);
    if (this.dclose) {
      this.delayclose(fps);
    }
  }
}

// 初始化对象集合
export const CreateObj = function(object) {
  let NewOb = {};
  for (const key in object) {
    if (object.hasOwnProperty(key) && !(object[key] instanceof CVBASIC)) {
      NewOb[key] = Create(object[key]);
      NewOb[key].setattr("name", key);
    }
  }
  return NewOb;
};

// 初始化对象实例
const Create = function(ob) {
  let newob;
  switch (ob.type) {
    case "IMG":
      newob = new CVIMG(ob);
      break;

    case "ANIMATED":
      newob = new CVANIMAT(ob);
      break;

    case "FONT":
      newob = new CVFONT(ob);
      break;

    case "GRAPH":
      newob = new CVGRAPH(ob);
      break;

    default:
      console.log("对象type定义错误", ob.type);
      return null;
  }
  return newob;
};

