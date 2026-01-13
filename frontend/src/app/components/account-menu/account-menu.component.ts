import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'app-account-menu',
    imports: [RouterLink],
    templateUrl: './account-menu.component.html',
    styleUrl: './account-menu.component.css',
})
export class AccountMenuComponent {
    constructor(private authService: AuthService) {}

    logout() {
        this.authService.logout();
    }
}
