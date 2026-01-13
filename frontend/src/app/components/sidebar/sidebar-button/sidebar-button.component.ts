import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-sidebar-button',
    imports: [RouterLink],
    templateUrl: './sidebar-button.component.html',
    styleUrl: './sidebar-button.component.css',
})
export class SidebarButtonComponent {
    @Input() isActive = false;
    @Input({ required: true }) iconSrc!: string;
    @Input({ required: true }) iconAlt!: string;
    @Input({ required: true }) link!: string;
}
