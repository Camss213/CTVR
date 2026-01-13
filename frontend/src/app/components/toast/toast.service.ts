import { Injectable } from '@angular/core';

type ToastType = 'error' | 'success' | 'info';

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    toasts: {
        message: string;
        type: ToastType;
        timeout: ReturnType<typeof setTimeout>;
    }[] = [];

    show(message: string, type: ToastType = 'info') {
        if (this.toasts.length >= 3) {
            const toast = this.toasts.shift();
            if (toast) {
                clearTimeout(toast.timeout);
            }
        }

        const toast = {
            message,
            type,
            timeout: setTimeout(() => {
                const index = this.toasts.indexOf(toast);
                if (index !== -1) {
                    this.close(index);
                }
            }, 10000),
        };

        this.toasts.push(toast);
    }

    close(index: number) {
        clearTimeout(this.toasts[index].timeout);
        this.toasts.splice(index, 1);
    }
}
