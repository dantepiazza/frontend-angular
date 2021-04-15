import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

// Services
import { AuthenticationService } from 'src/app/platform/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RoutingGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.isLogin()) {
      return true;
    } else {
      this.router.navigate([''], { queryParams: { returnUrl: state.url }});
    }

    return false;
  }

  isLogin(): boolean {
    if (this.authenticationService.authenticationGet()) {
      return true;
    }

    return false;
  }
}
