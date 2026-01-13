import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-add-card',
    imports: [RouterLink],
    templateUrl: './add-card.component.html',
    styleUrl: './add-card.component.css',
})
export class AddCardComponent {
    @Input({ required: true }) link!: string;
    @Input({ required: true }) title!: string;
}
