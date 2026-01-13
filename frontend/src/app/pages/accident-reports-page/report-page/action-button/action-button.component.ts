import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-action-button',
    imports: [],
    templateUrl: './action-button.component.html',
    styleUrl: './action-button.component.css',
})
export class ActionButtonComponent {
    @Input({ required: true }) iconSrc!: string;
    @Input({ required: true }) iconAlt!: string;
}
