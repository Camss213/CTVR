import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { SidebarButtonComponent } from './sidebar-button/sidebar-button.component';

@Component({
    selector: 'app-sidebar',
    imports: [SidebarButtonComponent],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
    currentPage: string;
    opened = false;

    constructor(router: Router, private authService: AuthService) {
        this.currentPage = router.url;

        router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => {
                this.currentPage = event.urlAfterRedirects;
                this.opened = false;
            });
    }

    get showUsers() {
        return this.authService.hasRequiredRole(['ADMIN']);
    }

    switch() {
        this.opened = !this.opened;
    }
}
