import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

export const jwtTokenInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  if(!req.url.includes("/auth") && !req.url.includes("/rss") && !req.url.includes("/image")){
    const localToken = localStorage.getItem("token");
    if(localToken){
      req = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + localToken)});
    }else{
      inject(Router).navigate(["/login"]);
    }
  }
  return next(req).pipe(tap(event => {
      if (event.type === HttpEventType.Response) {
        if(event.status === 401){
          inject(Router).navigate(["/login"]);
        }
      }
    }));
};
