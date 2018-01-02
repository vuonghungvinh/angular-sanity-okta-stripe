import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';
import { AlertService } from './alert.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private oktaAuth: OktaAuthService,
        private router: Router,
        private alertService: AlertService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.oktaAuth.isAuthenticated()) {
            return true;
        }
        this.alertService.error('Please login!');
        this.router.navigate(['/']);
        return false;
    }
}
