import { Component, OnInit, HostListener, ElementRef } from "@angular/core";

import { BaseService } from "../services/base.service";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"]
})
export class GameComponent implements OnInit {
  @HostListener("window:resize", ["$event"]) onreset(e) {
    this.Base.initWidow();
  }
  //禁用鼠标右键
  @HostListener("document:contextmenu") oncontextmenu() {
    return false;
  }

  constructor(public Base: BaseService, public el: ElementRef) {}

  ngOnInit() {
    this.Base.initWidow();

    // 设置音效
    let MU = this.Base.Music;
    MU.bg_music.dom = this.creat_bg_music();
    MU.game_music.doms = this.creat_game_musics(8);

    //禁用鼠标右键
    //  document.oncontextmenu = function(){return false;}
  }
  ngAfterViewInit() {}

  public creat_bg_music() {
    let audio = new Audio();
    audio.loop = true;
    audio.autoplay = true;
    audio.volume = this.Base.Music.bg_music.value;
    audio.src = "../../assets/media/home.mp3";
    //PC端自动播放

    // 兼容移动端自动播放
    let musicHandler = function() {
      if (audio.paused) {
        const promise = new Promise((resolve, reject) => {
          audio.load();
          setTimeout(() => {
            resolve();
          }, 500);
        });
        promise.then(() => {
          audio.play();
        });
      }
      document.body.removeEventListener("touchstart", musicHandler);
    };
    document.body.addEventListener("touchstart", musicHandler);

    return audio;
  }

  public creat_game_musics(len) {
    let doms = [];
    for (let i = 0; i < len; i++) {
      let audio = new Audio();
      audio.volume = this.Base.Music.game_music.value;
      audio.src = "../../assets/media/qzniu/000.mp3";

      // 兼容移动端自动播放
      let musicHandler = function() {
        const promise = new Promise((resolve, reject) => {
          audio.load();
          setTimeout(() => {
            resolve();
          }, 100);
        });
        promise.then(() => {
          audio.play();
        });
        document.body.removeEventListener("touchstart", musicHandler);
      };
      document.body.addEventListener("touchstart", musicHandler);

      doms.push(audio);
    }
    return doms;
  }
}
