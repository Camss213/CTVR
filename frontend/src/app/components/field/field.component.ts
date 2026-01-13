import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-field',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FieldComponent),
            multi: true,
        },
    ],
    imports: [],
    templateUrl: './field.component.html',
    styleUrl: './field.component.css',
})
export class FieldComponent implements ControlValueAccessor {
    @Input() label!: string;
    @Input() type:
        | 'text'
        | 'textarea'
        | 'date'
        | 'time'
        | 'number'
        | 'textarea'
        | 'select' = 'text';
    @Input() required = false;
    @Input({ required: true }) id!: string;
    @Input() pattern?: string;
    @Input() minLength?: number;
    @Input() maxLength?: number;
    @Input() list?: string;
    @Input() options: { value: string; label: string }[] = [];

    value = '';
    isDisabled = false;

    private onChange(value: string) {}

    private onTouched() {}

    writeValue(value: string): void {
        this.value = value;
    }

    registerOnChange(fn: (value: string) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    onInputChange(event: Event): void {
        const inputValue = (event.target as HTMLInputElement).value;
        this.value = inputValue;
        this.onChange(inputValue);
        this.onTouched();
    }
}
