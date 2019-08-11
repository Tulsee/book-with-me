import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import "rxjs/Rx";
import { JwtHelperService } from "@auth0/angular-jwt";
import "core-js/es7/reflect";
import * as moment from "moment";

import { HttpClient } from "@angular/common/http";

const jwt = new JwtHelperService();
class DecodedToken {
  exp: number = 0;
  username: string = "";
}
@Injectable()
export class AuthService {
  private decodedToken;
  constructor(private http: HttpClient) {
    this.decodedToken =
      JSON.parse(localStorage.getItem("bwm_meta")) || new DecodedToken();
  }
  public register(userData: any): Observable<any> {
    return this.http.post("/api/v1/users/register", userData);
  }

  private saveToken(token): string {
    //debugger;
    this.decodedToken = jwt.decodeToken(token.token);
    localStorage.setItem("bwm_auth", token.token);
    localStorage.setItem("bwm_meta", JSON.stringify(this.decodedToken));
    return token;
  }
  private getExpirationTime() {
    return moment.unix(this.decodedToken.exp);
  }

  public login(userData: any): Observable<any> {
    return this.http.post("/api/v1/users/auth", userData).map(token => {
      //debugger;
      return this.saveToken(token);
    });
  }

  public logout() {
    localStorage.removeItem("bwm_auth");
    localStorage.removeItem("bwm_meta");
    this.decodedToken = new DecodedToken();
  }
  public isAuthenticated(): boolean {
    return moment().isBefore(this.getExpirationTime());
  }

  public getToken(): string {
    return localStorage.getItem("bwm_auth");
  }

  public getUsername(): string {
    return this.decodedToken.username;
  }
}
