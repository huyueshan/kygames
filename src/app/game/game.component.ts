import { Component, OnInit, HostListener, ElementRef } from "@angular/core";

import { BaseService } from "../services/base.service";
// import { Utils } from '../factory/utils';

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"]
})
export class GameComponent implements OnInit {
  @HostListener("window:resize", ["$event"]) onreset(e) {
    this.Base.initWidow();
  }

  constructor(public Base: BaseService, public el: ElementRef) {}

  ngOnInit() {
    this.Base.initWidow();

    // 设置音效
    let MU = this.Base.Music;
    MU.bg_music.dom = this.creat_bg_music();
    MU.game_music.doms = this.creat_game_musics(8);
  }
  ngAfterViewInit() {}

  public creat_bg_music() {
    let audio = new Audio();
    audio.loop = true;
    audio.autoplay = true;
    audio.volume = this.Base.Music.bg_music.value;

    // 兼容移动端自动播放
    let musicHandler = function() {
      audio.play();
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

      // 兼容移动端自动播放
      let musicHandler = function() {
        audio.play();
        document.body.removeEventListener("touchstart", musicHandler);
      };
      document.body.addEventListener("touchstart", musicHandler);

      doms.push(audio);
    }
    return doms;
  }
}
