import { NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'app-login-page',
    imports: [ReactiveFormsModule, NgIf],
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
    loginForm = new FormGroup({
        username: new FormControl('', { nonNullable: true }),
        password: new FormControl('', { nonNullable: true }),
    });
    isLoading = false;
    errorMessage: string | null = null;
    redirectParam?: string;

    constructor(
        private authService: AuthService,
        private route: ActivatedRoute
    ) {
        this.route.queryParams.subscribe((params) => {
            this.redirectParam = params['redirect'];
        });
    }

    public onSubmit() {
        if (this.loginForm.invalid) {
            this.errorMessage = 'Veuillez remplir tous les champs.';
            return;
        }

        const user = this.loginForm.getRawValue();

        this.isLoading = true;
        this.errorMessage = null;

        const token = this.authService.login(user.username, user.password);
        token.subscribe({
            next: () => {
                this.isLoading = false;
                this.authService.loginRedirect(this.redirectParam);
            },
            error: (e: HttpErrorResponse) => {
                this.isLoading = false;
                if (e.status !== 404 && typeof e.error === 'string') {
                    this.errorMessage = e.error;
                } else {
                    this.errorMessage = 'Erreur de connexion';
                }
                console.error('Login error', e);
            },
        });
    }
}
