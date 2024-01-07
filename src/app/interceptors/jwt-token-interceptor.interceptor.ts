import { HttpInterceptorFn } from '@angular/common/http';

export const jwtTokenInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  if(!req.url.includes("/auth") && !req.url.includes("/rss") && !req.url.includes("/image")){
    const localToken = localStorage.getItem("token");
    req = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + localToken)});
  }
  return next(req);
};
