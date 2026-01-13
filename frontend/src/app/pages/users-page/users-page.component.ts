import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../components/toast/toast.service';
import { DriverIdentity } from '../drivers-page/driver';
import { DriverPickerComponent } from '../routes-page/driver-picker/driver-picker.component';
import { User } from './user';
import { UserService } from './user.service';

@Component({
    selector: 'app-users-page',
    imports: [FormsModule, DriverPickerComponent],
    templateUrl: './users-page.component.html',
    styleUrls: ['./users-page.component.css'],
})
export class UsersPageComponent {
    users?: User[];
    selectedUser: User | null = null;

    constructor(private service: UserService, private toast: ToastService) {
        this.service.getList().subscribe({
            next: (data) => {
                this.users = data;
            },
            error: (e) => {
                console.error(e);

                this.toast.show(
                    'Impossible de récupérer les utilisateurs',
                    'error'
                );
            },
        });
    }

    add() {
        this.users?.push({
            id: null,
            driverName: null,
            drivingLicenceNumber: null,
            role: 'DRIVER',
            username: '',
        });
    }

    save(user: User) {
        this.service.save(user).subscribe({
            next: (userId) => {
                user.id = Number(userId);

                this.toast.show(
                    'Utilisateur sauvegardé avec succès',
                    'success'
                );
            },
            error: (e) => {
                console.error(e);

                this.toast.show(
                    "Impossible de sauvegarder l'utilisateur",
                    'error'
                );
            },
        });
    }

    delete(id: number) {
        if (!confirm("Êtes-vous sûr de vouloir supprimer l'utilisateur ?")) {
            return;
        }

        this.service.delete(id).subscribe({
            next: () => {
                this.toast.show('Utilisateur supprimé avec succès', 'success');
                this.users = this.users?.filter((u) => u.id !== id);
            },
            error: (e) => {
                console.error(e);

                this.toast.show(
                    "Impossible de supprimer l'utilisateur",
                    'error'
                );
            },
        });
    }

    changeDriver(driver: DriverIdentity) {
        if (this.selectedUser) {
            this.selectedUser.drivingLicenceNumber =
                driver.drivingLicenceNumber;
            this.selectedUser.driverName =
                driver.firstName + ' ' + driver.lastName;
        }
    }
}
