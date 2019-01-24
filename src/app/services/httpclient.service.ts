import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { BaseService } from "../services/base.service";



@Injectable({
  providedIn: "root"
})
export class HttpclientService {
  constructor(private http: HttpClient, public Base: BaseService) {}

  public httpOptions = {
    headers: new HttpHeaders({
      // "Content-Type": "application/x-www-form-urlencoded"
      "Content-Type": "application/json;charset=utf-8",
      // "Authorization": this.Base.userinfo.token,
      // observe: 'response'
    })
  };

  public post(url: string, params: any = null): Observable<any> {
    params = params ? JSON.parse(JSON.stringify(params)) : null;
    return this.http.post(url, params, this.httpOptions);
  }

  public get(url: string, params: any = null): Observable<any> {
    params = params ? JSON.parse(JSON.stringify(params)) : null;
    let newurl = this.getUrl(url, params);
    return this.http.get(newurl);
  }

  private getUrl(url, params) {
    // 添加url参数
    if (params !== null) {
      let sb = "";
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          const value = params[key];
          if (sb === "") {
            sb += "?";
          } else {
            sb += "&";
          }
          sb += `${key}=${value}`;
        }
      }
      url += sb;
    }
    return url;
  }
}
