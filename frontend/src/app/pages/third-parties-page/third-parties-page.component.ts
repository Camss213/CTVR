import { AsyncPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CardSkeletonComponent } from '../../components/card-skeleton/card-skeleton.component';
import { AddThirdCardComponent } from './add-third-party-card/add-third-party-card.component';
import { ThirdParty } from './third-party';
import { ThirdPartyCardComponent } from './third-party-card/third-party-card.component';
import { ThirdPartyService } from './third-party.service';

@Component({
    selector: 'app-third-parties-page',
    templateUrl: './third-parties-page.component.html',
    styleUrl: './third-parties-page.component.css',
    imports: [
        CardSkeletonComponent,
        ThirdPartyCardComponent,
        NgFor,
        AsyncPipe,
        AddThirdCardComponent,
    ],
})
export class ThirdPartiesPageComponent {
    thirdParties$!: Observable<ThirdParty[]>;
    newThirdParty = false;

    constructor(private service: ThirdPartyService) {
        this.reload();
    }

    reload() {
        this.thirdParties$ = this.service.getAll();
    }
}
