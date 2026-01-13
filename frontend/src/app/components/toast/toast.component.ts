import { Component } from '@angular/core';
import { ToastService } from './toast.service';

@Component({
    selector: 'app-toast',
    imports: [],
    templateUrl: './toast.component.html',
    styleUrl: './toast.component.css',
})
export class ToastComponent {
    constructor(public service: ToastService) {}
}
