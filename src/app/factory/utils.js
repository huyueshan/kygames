const setparameter = {
  // 全局可配置属性
  uiw: null,
  uih: null,
  xto: null,
  xtl: null,
  xtr: null,
  yto: null,
  ytt: null,
  ytb: null,
  store: null,
  show: null,
  // 文字可配置属性
  str: '',
  size: 12,
  color: '#000000',
  Gradient: false,
  Gradient_data: null,
  // 文字和形状可配置属性
  lw: "2",
  sc: "#000000",
  stroke: false,
  // 形状可配置属性
  fc: "#FFFFFF",
  fill: false,
  shape: 'rect',
};

let simple_numb = -1;

const FN = {
  // 全屏事件
  FullScreen() {
    let el = document.body || document.getElementsByTagName("body")[0]; // 全屏元素
    let requestMethod =
      el.requestFullScreen ||
      el.webkitRequestFullScreen ||
      el.mozRequestFullScreen ||
      el.msRequestFullscreen;
    if (requestMethod) {
      requestMethod.call(el);
    } else if (typeof window.ActiveXObject !== "undefined") {
      var wscript = new ActiveXObject("WScript.Shell");
      if (wscript !== null) {
        wscript.SendKeys("{F11}");
      }
    }
  },

  // 退出全屏事件
  ExitFull() {
    let exitMethod = document.exitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen || document.msExitFullscreen;
    if (exitMethod) {
      exitMethod.call(document);
    } else if (typeof window.ActiveXObject !== "undefined") {
      var wscript = new ActiveXObject("WScript.Shell");
      if (wscript !== null) {
        wscript.SendKeys("{F11}");
      }
    }
  },


  // 设置绘画对象是否需要绘制
  SetDisplay(data, isShow = true) {
    if (data instanceof Array) {
      for (let i = 0; i < data.length; i++) {
        data[i].show = isShow;
      }
    } else {
      data.show = isShow;
    }
  },

  //  ctx: canvas 画布对象上下文
  //    k: kystore.service 服务对象 不同页面相对不同页面的服务对象
  //   ob: 所绘制对象  *必须是new出来的定义的绘制对象类型

  // 绘制图片方法
  DrawImg(ctx, k, ob) {
    if (ob.dopen) {
      ob.delayopen(k.FPS)
    } else {
      ob.init(k.CS, k.CW, k.CH, k.FPS);

      // 如果旋转
      let ro = ob.rotate;
      let ox, oy;
      if (ro) {
        ox = ob.w / 2 + ob.x;
        oy = ob.h / 2 + ob.y
        ctx.save();
        ctx.translate(ox, oy);
        ctx.rotate(ro * Math.PI / 180);
        ob.x = -1 * ob.w / 2;
        ob.y = -1 * ob.h / 2;
      };
      ctx.drawImage(ob.img, ob.x, ob.y, ob.w, ob.h);

      // 旋转结束
      if (ro) {
        ctx.translate(-1 * ox, -1 * oy);
        ctx.restore();
      }

    }
  },

  // 绘制动画方法
  DrawAnimate(ctx, k, ob) {
    ob.init(k.CS, k.CW, k.CH, k.FPS);

    // 如果旋转
    let ro = ob.rotate;
    let ox, oy;
    if (ro) {
      ox = ob.w / 2 + ob.x;
      oy = ob.h / 2 + ob.y
      ctx.save();
      ctx.translate(ox, oy);
      ctx.rotate(ro * Math.PI / 180);
      ob.x = -1 * ob.w / 2;
      ob.y = -1 * ob.h / 2;
    }

    ctx.drawImage(ob.img, ob.x, ob.y, ob.w, ob.h);

    // 旋转结束
    if (ro) {
      ctx.translate(-1 * ox, -1 * oy);
      ctx.restore();
    }

  },

  // 绘制文字方法  data: *必须
  DrawFont(ctx, k, ob) {
    ob.init(k.CS, k.CW, k.CH, k.FPS);


    // 如果渐变
    if (ob.Gradient && ob.Gradient_data.length > 0) {
      let grd = ctx.createLinearGradient(ob.x, (ob.y - ob.h), ob.x, ob.y);
      let arr = ob.Gradient_data;
      for (let i = 0; i < arr.length; i++) {
        grd.addColorStop(i / (arr.length - 1), arr[i]);
      };
      ctx.fillStyle = grd; // 目前只设置填充渐变
    } else {
      ctx.fillStyle = ob.c;
    }

    ctx.strokeStyle = ob.sc;
    ctx.font = ob.wt + ' ' + ob.s + 'px ' + ob.f;

    // 如果旋转
    let ro = ob.rotate;
    let ox, oy;
    if (ro) {
      ox = ob.w / 2 + ob.x;
      oy = ob.h / 2 + ob.y
      ctx.save();
      ctx.translate(ox, oy);
      ctx.rotate(ro * Math.PI / 180);
      ob.x = -1 * ob.w / 2;
      ob.y = -1 * ob.h / 2;
    }
    if (ob.stroke) {
      ctx.lineWidth = ob.lw;
      ctx.strokeText(ob.str, ob.x, ob.y);;
    }

    ctx.fillText(ob.str, ob.x, ob.y);

    // 旋转结束
    if (ro) {
      ctx.translate(-1 * ox, -1 * oy);
      ctx.restore();
    }
  },


  // 绘制图形（矩形和圆形）方法  data: *必须
  DrawGraph(ctx, k, ob) {
    ob.init(k.CS, k.CW, k.CH, k.FPS);
    ctx.fillStyle = ob.fc;
    ctx.strokeStyle = ob.sc;
    ctx.lineWidth = ob.lw;


    // 如果旋转
    let ro = ob.rotate;
    let ox, oy;
    if (ro) {
      ox = ob.w / 2 + ob.x;
      oy = ob.h / 2 + ob.y
      ctx.save();
      ctx.translate(ox, oy);
      ctx.rotate(ro * Math.PI / 180);
      ob.x = -1 * ob.w / 2;
      ob.y = -1 * ob.h / 2;
    }

    switch (ob.shape) {
      case 'rect':
        ctx.rect(ob.x, ob.y, ob.w, ob.h);

        if (ob.fill) {
          ctx.fill();
        }
        ctx.stroke();
        break;

      case 'circle':
        ctx.beginPath();
        ctx.arc(ob.x, ob.y, ob.w / 2, 0, 2 * Math.PI);
        if (ob.fill) {
          ctx.fill();
        }
        ctx.stroke();
        break;

    };

    // 旋转结束
    if (ro) {
      ctx.translate(-1 * ox, -1 * oy);
      ctx.restore();
    }
  },


  // 可以绘制所有对象的方法，而且可以传arr对象对当前对象配置
  // 如果传arr对象，坐标必须传，
  // 文字对象必须传arr 而且arr.str属性必须（文字内容 默认“”）； 文字对象还可以传字体大小size，（不传默认12）；可以传颜色color（默认黑色）
  DrawObj(ctx, k, names, arr = null) {
    for (let i = 0; i < names.length; i++) {
      let name = names[i];
      let item = k.CVDATA[name];
      if (item.show) {

        if (arr !== null) {
          arr = Object.assign({}, setparameter, arr);
          item.xto = arr.xto;
          item.xtl = arr.xtl;
          item.xtr = arr.xtr;
          item.yto = arr.yto;
          item.ytt = arr.ytt;
          item.ytb = arr.ytb;
          item.store = arr.store ? Object.assign({}, item.store, arr.store) : item.store;
          item.show = arr.show === null ? item.show : arr.show;
          item.uiw = arr.uiw === null ? item.uiw : arr.uiw;
          item.uih = arr.uih === null ? item.uih : arr.uih;
        }
        switch (item.type) {
          case 'IMG':
            this.DrawImg(ctx, k, item);
            break;

          case 'ANIMATED':
            this.DrawAnimate(ctx, k, item);
            break;

          case 'FONT':
            if (arr !== null) {
              item.size = arr.size;
              item.c = arr.color;
              item.sc = arr.sc;
              item.lw = arr.lw;
              item.stroke = arr.stroke;
              item.str = arr.str;
              item.Gradient = arr.Gradient;
              item.Gradient_data = arr.Gradient_data == null ? item.Gradient_data : arr.Gradient_data;
            }
            this.DrawFont(ctx, k, item);
            break;

          case 'GRAPH':
            if (arr !== null) {
              item.fc = arr.fc;
              item.sc = arr.sc;
              item.lw = arr.lw;
              item.fill = arr.fill;
              item.shape = arr.shape;
            };
            this.DrawGraph(ctx, k, item);
            break;

        };

        // 事件
        if (item.event) {
          let a = item.getposition();
          a.ob = item;
          k.EVENT.push(a);
        }

      };

    };

  },

  // 普通计时器 不能同时多处使用 返回true后必须不再调用，继续调用会重新计时
  // numb 为计时时间 单位ms
  // rate 为当前进度两位小数比，
  Simple(KY, numb, callback = null) {
    simple_numb = simple_numb == -1 ? 0 : simple_numb;
    simple_numb += KY.FPS;
    if (simple_numb >= numb) {
      simple_numb = -1
      return true;
    };
    if (callback && typeof callback == "function") {
      let rate = simple_numb / numb;
      callback(rate.toFixed(2))
    }
    return false
  },

  // 倒计时 计时器方法
  // 必须创建一个type=FONT 的'F_mid_timer'绘制对象
  Timer(KY, callback = null) {
    let n = KY.CountDown;
    KY.CountDown -= (KY.FPS / 1000);
    if (KY.CountDown <= 0) {
      KY.CVDATA.F_mid_timer.show = true;
      KY.CountDown = 0;
      return true;
    };
    if (Math.ceil(KY.CountDown) !== Math.ceil(n)) {
      KY.CVDATA.F_mid_timer.show = true;
      KY.CVDATA.F_mid_timer.translateX = 0;
      KY.CVDATA.F_mid_timer.translateY = 0;
    }
    KY.CVDATA.F_mid_timer.str = Math.ceil(KY.CountDown) + '';
    callback && typeof callback == "function" && callback();
    return false
  },

  //  判断一个点是否在圆的内部
  //  @param point  测试点坐标
  //  @param circle 圆心坐标
  //  @param r 圆半径
  //  返回true为真，false为假
  pointInsideCircle(point, circle, r) {
    if (r === 0) return false
    var dx = circle.x - point.x
    var dy = circle.y - point.y
    return dx * dx + dy * dy <= r * r
  },


  // 图片透明度绘制 不能画.png的图片
  Alpha_Image(ctx, image, x, y, w, h, alpha, CW, CH) {
    let Img = ctx.getImageData(0, 0, CW, CH);
    // 绘制图片
    ctx.drawImage(image, x, y, w, h);
    // 获取从x、y开始，宽为w、高为h的图片数据
    let imgData = ctx.getImageData(x, y, w, h);
    for (let i = 0, len = imgData.data.length; i < len; i += 4) {
      // 改变每个像素的透明度
      imgData.data[i + 3] = imgData.data[i + 3] * alpha;
    }
    // 将获取的图片数据放回去。
    ctx.putImageData(Img, 0, 0);
    ctx.putImageData(imgData, x, y);
  },

  // 映射对象属性 将ob2对象的所有属性映射到ob1;
  ObMaping(ob1, ob2) {
    for (const key in ob2) {
      if (ob2.hasOwnProperty(key)) {
        if (ob1[key]) {
          throw console.error("对象名重复:", key);
        }
        ob1[key] = ob2[key];
      }
    }
  },

  // 随机整数
  Random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },

  // 随机排序方法
  Randomsort(arr) {
    let newarr = [...arr];
    newarr.sort((a, b) => {
      return Math.random() > .5 ? -1 : 1;
    });
    return newarr;
  },


  // 播放背景音乐
  play_bg_music(audio, src) {
    const promise = new Promise((resolve, reject) => {
      audio.src = src;
      audio.load();
      setTimeout(() => {
        resolve();
      }, 100);
    });
    promise.then(() => {
      audio.play();
    });
  },
  // 移动端触屏后播放背景音乐
  mobile_bg_music(audio, src) {
    if (audio.paused) {
      this.play_bg_music(audio, src)
    }
  },
  // 播放游戏音效
  play_game_music(audios, src) {
    let len = audios.length;
    for (let i = 0; i < len; i++) {
      if (audios[i].paused) {
        audios[i].src = src;
        audios[i].play();
        return true
      }
    }
    console.log("播放音效失败");
    return false
  },


};



export const Utils = {
  FN,
};
