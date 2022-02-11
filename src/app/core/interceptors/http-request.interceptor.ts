import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, map, Observable, throwError } from "rxjs";
import { AuthenticationService } from "../services/authentication.service";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
    constructor(private auth: AuthenticationService,
        private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url && this.auth.isAuthenticated()) {
            const idToken = this.auth.authorizationHeaderValue;
            const request: HttpRequest<any> = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${idToken}`
                },
            });
            return next
                .handle(request)
                .pipe(map(res => res), catchError((err: any) => throwError(err)));
        }
        else if (this.auth.isTokenAvaialable()) {
            this.auth.logout();
            this.router.navigate(['login']);
        }
        return next.handle(req).pipe(map(res => res), catchError((err) => throwError(err)));
    }


}