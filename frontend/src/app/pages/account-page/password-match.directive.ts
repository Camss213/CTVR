import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        return control.get('password')?.value ===
            control.get('newPasswordConfirm')?.value
            ? null
            : { passwordsMismatch: true };
    };
}
