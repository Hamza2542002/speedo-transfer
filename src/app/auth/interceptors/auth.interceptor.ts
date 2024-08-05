import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let token = '';
  if (localStorage) token = localStorage.getItem('token') ?? '';

  console.log(token);
  req = req.clone({
    setHeaders: {
      Authorization: token ? `Token ${token}` : '',
    },
  });
  return next(req);
};
