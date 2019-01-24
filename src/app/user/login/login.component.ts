import { Component, OnInit, ElementRef } from "@angular/core";
import { Router } from "@angular/router";

import { HttpclientService } from "../../services/httpclient.service";
import { BaseService } from "../../services/base.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public user = { user_name: "", password: "" }; // 表单信息
  public errtip = ""; // 验证错误提示
  constructor(
    private el: ElementRef,
    private router: Router,
    public Http: HttpclientService,
    public Base: BaseService
  ) {}

  ngOnInit() {}

  public sub() {
    let V = this.user;
    let act = this.el.nativeElement.querySelector('input[name="account"]');
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

    this.Http.post("http://172.16.101.10:7892/v1/login", this.user).subscribe(
      res => {
        if (res.code == 200) {
          this.Base.userinfo = Object.assign({}, this.Base.userinfo, res.data);
          this.router.navigate(["game"]);
          console.log("登录成功");
        } else {
          this.errtip = "登录账号与密码不匹配！";
        }
      }
    );
  }
}
