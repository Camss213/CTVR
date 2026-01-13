import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { AccountMenuComponent } from '../account-menu/account-menu.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ToastComponent } from '../toast/toast.component';

@Component({
    selector: 'app-layout',
    imports: [
        SidebarComponent,
        RouterOutlet,
        AccountMenuComponent,
        ToastComponent,
    ],
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.css',
})
export class LayoutComponent {
    constructor(private authService: AuthService) {}

    get showSidebar() {
        return !this.authService.hasRequiredRole(['DRIVER', 'S_TECH']);
    }
}
