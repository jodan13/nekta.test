import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthService,
    private router: Router
  ){}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (this.auth.isAuthenticated()){
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.token}`
        }
      })
    }
    return next.handle(req)
    .pipe(
      catchError((error: HttpErrorResponse)=>{
        if(error.status === 401){
          this.auth.logout()
          this.router.navigate(['/'])
        }
        return throwError(error)
      })
    )
  }
}
