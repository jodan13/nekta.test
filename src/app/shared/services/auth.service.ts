import { Injectable } from "@angular/core";
import { Observable, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { nAuthResponse, User } from "../interface";
import { environment } from "src/environments/environment";

@Injectable()
export class AuthService {

  public error$: Subject<string> = new Subject<string>()

  constructor(private http: HttpClient) {}

  get token(): string {
    const expDate = new Date(localStorage.getItem('n-token-exp'))
    if (new Date() > expDate) {
      this.logout()
      return null
    }
    return localStorage.getItem('n-token')
  }

  login(user: User): Observable<any> {
    user.personal_data_access = true
    return this.http.post(`${environment.nUrl}/auth/login`, user)
    .pipe(
      tap(this.setToken),
      catchError(this.handleError.bind(this))
    )
  }
  logout() {
    this.setToken(null)
  }

  isAuthenticated(): boolean {
    return !!this.token
  }
  private handleError(error: HttpErrorResponse) {
    const message = error.error.error.data.msg
    this.error$.next(message)
    return throwError(error)
  }
  private setToken(response: nAuthResponse | null) {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.data.expires_at)
      localStorage.setItem('n-token', response.data.access_token)
      localStorage.setItem('n-token-exp', expDate.toString())
    } else {
      localStorage.clear()
    }

  }
}
