import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivateChild,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import { Role } from '../pages/users-page/user';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivateChild {
    constructor(private authService: AuthService, private router: Router) {}

    canActivateChild(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        if (state.url === '/' || state.url.startsWith('/?')) {
            if (this.authService.isLogged) {
                this.authService.loginRedirect(
                    childRoute.queryParams['redirect']
                );
                return false;
            }
        } else {
            if (!this.authService.isLogged) {
                this.authService.logout(state.url);
                return false;
            }

            const roles: Role[] | undefined = childRoute.data['roles'];
            if (roles && !this.authService.hasRequiredRole(roles)) {
                this.router.navigate(['/unauthorized']);
                return false;
            }
        }

        return true;
    }
}
