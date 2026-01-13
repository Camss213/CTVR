import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Observable, tap } from 'rxjs';
import { ToastService } from '../../components/toast/toast.service';
import { Stats } from '../../stats/stats';
import { StatsService } from '../../stats/stats.service';

@Component({
    selector: 'app-home-page',
    imports: [AsyncPipe, BaseChartDirective],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.css',
})
export class HomePageComponent {
    stats$?: Observable<Stats>;

    constructor(private service: StatsService, private toast: ToastService) {
        this.stats$ = this.service.getStats().pipe(
            tap({
                error: (e) => {
                    console.error(e);
                    this.toast.show(
                        'Impossible de récupérer les stats',
                        'error'
                    );
                },
            })
        );
    }

    getDurationFromDays(days: number) {
        return `${days.toLocaleString()} jours`;
    }

    getDurationFromYears(years: number) {
        return `${years.toLocaleString()} ans`;
    }

    getFurnitureCostChartData(stats: Stats): ChartData {
        return {
            labels: stats.furnitureCostPerYear.map((f) => f.year),
            datasets: [
                {
                    label: 'Coût total des fournitures par an',
                    data: stats.furnitureCostPerYear.map(
                        (f) => f.furnitureCostPerYear
                    ),
                    fill: false,
                    tension: 0.1,
                },
            ],
        };
    }

    getAccidentChartData(stats: Stats): ChartData {
        return {
            labels: stats.accidentsPerYear.map((a) => a.year),
            datasets: [
                {
                    label: "Nombre d'accidents par année",
                    data: stats.accidentsPerYear.map((a) => a.nbAccident),
                    fill: false,
                    tension: 0.1,
                },
            ],
        };
    }
}
