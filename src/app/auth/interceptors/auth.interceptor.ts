import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let token: string = localStorage.getItem('authToken') ?? '';
  req = req.clone({
    setHeaders: {
      Authorization: token ? `Bearar ${token}` : '',
    },
  });
  return next(req);
};
