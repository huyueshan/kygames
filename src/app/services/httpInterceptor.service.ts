
import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { BaseService } from "../services/base.service";


@Injectable()
export class NoopInterceptor implements HttpInterceptor {
  constructor(public Base: BaseService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    /*设置额外的头部，token用于登陆令牌*/
    const newReq = req.clone({
      headers: req.headers.set('Authorization', this.Base.userinfo.token)
    });
    return next.handle(newReq).pipe(
      /*失败时重试1次*/
      retry(1),
      /*捕获响应错误*/
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let msg = "请求失败";
    if (error["status"] == 0) {
      msg = "网络请求失败";
    }
    if (error["status"] == 400) {
      msg = "请求参数正确";
    }
    if (error["status"] == 404) {
      msg = "请检查路径是否正确";
    }
    if (error["status"] == 500) {
      msg = "请求的服务器错误";
    }
    return throwError(
      `success: false, msg: ${msg}, status: ${error["status"]}`
    );
  }
}
