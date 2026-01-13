import { AsyncPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CardSkeletonComponent } from '../../components/card-skeleton/card-skeleton.component';
import { AddBusCardComponent } from './add-bus-card/add-bus-card.component';
import { Bus } from './bus';
import { BusCardComponent } from './bus-card/bus-card.component';
import { BusService } from './bus.service';

@Component({
    selector: 'app-bus-page',
    imports: [
        CardSkeletonComponent,
        AddBusCardComponent,
        AsyncPipe,
        NgFor,
        BusCardComponent,
    ],
    templateUrl: './bus-page.component.html',
    styleUrl: './bus-page.component.css',
})
export class BusPageComponent {
    buses$!: Observable<Bus[]>;
    newBus = false;

    constructor(private service: BusService) {
        this.reload();
    }

    reload() {
        this.buses$ = this.service.getList();
    }
}
