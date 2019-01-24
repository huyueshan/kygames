import { Component, OnInit, ElementRef } from "@angular/core";

import { HttpclientService } from "../../services/httpclient.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  public user = { user_name: "", nick_name: "", password: "", device: 1 }; // 表单信息
  public clause = false; // 同意条款
  public errtip = ""; // 验证错误提示
  public succeed = false;
  constructor(
    private el: ElementRef,
    public Http: HttpclientService,
  ) {}

  ngOnInit() {}

  public sub() {
    let V = this.user;
    let act = this.el.nativeElement.querySelector('input[name="account"]');
    let name = this.el.nativeElement.querySelector('input[name="name"]');
    let psd = this.el.nativeElement.querySelector('input[name="password"]');
    this.errtip = "";

    // /^[a-zA-Z0-9]{3,12}$/.test(value)  // 匹配账号
    // /^(?!\d+$)(?![A-Za-z]+$)[a-zA-Z0-9]{6,20}$/.test(value) // 匹配密码
    if (V.user_name.trim() === "") {
      this.errtip = "账号不能为空！";
      act.focus();
      return;
    } else {
      if (!/^[a-zA-Z0-9]{3,12}$/.test(V.user_name)) {
        this.errtip = "账号格式不对！";
        act.focus();
        return;
      }
    }
    if (V.nick_name.trim() === "") {
      this.errtip = "昵称不能为空！";
      name.focus();
      return;
    } else {
      if (!/^[a-zA-Z0-9]{3,12}$/.test(V.nick_name)) {
        this.errtip = "昵称格式不对！";
        name.focus();
        return;
      }
    }
    if (V.password.trim() === "") {
      this.errtip = "密码不能为空！";
      psd.focus();
      return;
    } else {
      if (!/^(?!\d+$)(?![A-Za-z]+$)[a-zA-Z0-9]{6,20}$/.test(V.password)) {
        console.log(V.password);
        this.errtip = "输入的密码有误！";
        psd.focus();
        return;
      }
    }
    if (!this.clause) {
      this.errtip = "请同意条款！";
      return;
    }

    this.Http.post(
      "http://172.16.101.10:7892/v1/register",
      this.user
    ).subscribe(res => {
      console.log(res);
      this.succeed = true;
    });
  }
}
