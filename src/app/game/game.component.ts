import { Component, OnInit, HostListener, ElementRef } from "@angular/core";

import { BaseService } from "../services/base.service";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"]
})
export class GameComponent implements OnInit {
  @HostListener('window:resize', ['$event']) onreset(e) {
    this.Base.initWidow();
  }

  constructor(public Base: BaseService, public el: ElementRef) {}

  ngOnInit() {
    this.Base.initWidow();
    // 设置背景音乐
    this.Base.Music.bg_music.dom = this.el.nativeElement.querySelector("#pageBgAudio");
    this.Base.Music.bg_music.dom.volume = this.Base.Music.bg_music.value;
  }
  ngAfterViewInit(){

  }
}
