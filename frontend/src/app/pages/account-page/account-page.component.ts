import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { ToastService } from '../../components/toast/toast.service';
import { UserService } from '../users-page/user.service';
import { passwordMatchValidator } from './password-match.directive';

@Component({
    selector: 'app-account-page',
    imports: [ReactiveFormsModule],
    templateUrl: './account-page.component.html',
    styleUrl: './account-page.component.css',
})
export class AccountPageComponent {
    usernameForm = new FormGroup({
        username: new FormControl('', { nonNullable: true }),
    });
    passwordForm = new FormGroup(
        {
            oldPassword: new FormControl('', { nonNullable: true }),
            password: new FormControl('', { nonNullable: true }),
            newPasswordConfirm: new FormControl('', { nonNullable: true }),
        },
        passwordMatchValidator()
    );

    errorMessage: string | null = null;

    get passwordsMismatch() {
        return (
            (this.passwordForm.errors as { passwordsMismatch: boolean })
                ?.passwordsMismatch === true
        );
    }

    get username() {
        return this.authService.username;
    }

    constructor(
        private service: UserService,
        private authService: AuthService,
        private toast: ToastService
    ) {}

    public onUsernameSubmit() {
        if (this.usernameForm.invalid) {
            this.errorMessage = 'Veuillez remplir tous les champs.';
            return;
        }

        const user = this.usernameForm.getRawValue();

        this.service.updateUsername(user).subscribe({
            next: (token) => {
                this.authService.setSession(token);

                this.toast.show(
                    "Nom d'utilisateur modifié avec succès",
                    'success'
                );
            },
            error: (e) => {
                console.error(e);

                this.toast.show(
                    "Impossible de modifier le nom d'utilisateur",
                    'error'
                );
            },
        });
        this.usernameForm.reset();
    }

    public onPasswordSubmit() {
        if (this.passwordForm.invalid) {
            this.errorMessage = 'Veuillez remplir tous les champs.';
            return;
        }

        const userPassword = this.passwordForm.getRawValue();

        this.service.updatePassword(userPassword).subscribe({
            next: () => {
                this.toast.show('Mot de passe modifié avec succès', 'success');
            },
            error: (e) => {
                console.error(e);

                this.toast.show(
                    'Impossible de modifier le mot de passe',
                    'error'
                );
            },
        });
        this.passwordForm.reset();
    }
}
