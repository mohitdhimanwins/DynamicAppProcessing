import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs';
import { StorageKeys } from '../utils/storage-keys';
import { CommonHttpService } from './common-http.service';
import { LocalStorageService } from './local-storage.service';

interface AuthenticationRequest {
  username: string,
  otp: number
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(public jwtHelper: JwtHelperService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private commonHttpService: CommonHttpService,) { }

  get authorizationHeaderValue(): any {
    let token = this.localStorageService.get(StorageKeys.keys.AUTHTOKEN);
    return token;
  }

  authenticate(request: AuthenticationRequest) {
    return this.commonHttpService.post('authenticate', request).pipe(map(res => {
      if (res.token) {
        this.setUserTokens(res.token)
        if (res) {
          this.router.navigate(this.getLandingPageRoute());
        } else {
          this.router.navigate(['signup']);
        }
      } else {
        this.logout()
      }
    }))
  }

  isAuthenticated(): boolean {
    let isAuthenticated = false;
    try {
      const token = this.localStorageService.get(StorageKeys.keys.AUTHTOKEN) as string;
      isAuthenticated = !this.jwtHelper.isTokenExpired(token)
    } catch (ex) {
      isAuthenticated = false;
    }
    return isAuthenticated;
  }

  isTokenAvaialable(): boolean {
    let isTokenAvaialable = false;
    try {
      const token = this.localStorageService.get(StorageKeys.keys.AUTHTOKEN);
      isTokenAvaialable = (token) ? true : false;
    } catch (ex) {
      isTokenAvaialable = false;
    }
    return isTokenAvaialable;
  }

  setUserTokens(authToken: any) {
    this.localStorageService.set(StorageKeys.keys.AUTHTOKEN, authToken);
  }

  logout(): void {
    this.clearStorage();
    this.router.navigate(['']);
  }

  clearStorage(): void {
    this.localStorageService.remove(StorageKeys.keys.AUTHTOKEN);
    localStorage.clear();
  }

  getLandingPageRoute() {
    return ['home'] || ['404']
  }

}
