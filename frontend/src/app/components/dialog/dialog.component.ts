import { Component, ElementRef, HostListener } from '@angular/core';

@Component({
    selector: 'dialog',
    imports: [],
    templateUrl: './dialog.component.html',
    styleUrl: './dialog.component.css',
})
export class DialogComponent {
    constructor(private host: ElementRef<HTMLDialogElement>) {}

    @HostListener('click', ['$event'])
    close() {
        this.host.nativeElement.close();
    }

    show() {
        this.host.nativeElement.showModal();
    }
}
