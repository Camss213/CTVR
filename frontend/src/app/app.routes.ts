import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LayoutComponent } from './components/layout/layout.component';
import { AccidentReportsPageComponent } from './pages/accident-reports-page/accident-reports-page.component';
import { ReportPageComponent } from './pages/accident-reports-page/report-page/report-page.component';
import { AccountPageComponent } from './pages/account-page/account-page.component';
import { BusPageComponent } from './pages/bus-page/bus-page.component';
import { DriversPageComponent } from './pages/drivers-page/drivers-page.component';
import { ForbiddenPageComponent } from './pages/forbidden-page/forbidden-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { InterventionPageComponent } from './pages/interventions-page/intervention-page/intervention-page.component';
import { InterventionsPageComponent } from './pages/interventions-page/interventions-page.component';
import { QuotePageComponent } from './pages/interventions-page/quote-page/quote-page.component';
import { LinesPageComponent } from './pages/lines-page/lines-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { RoutesPageComponent } from './pages/routes-page/routes-page.component';
import { StopsPageComponent } from './pages/stops-page/stops-page.component';
import { ThirdPartiesPageComponent } from './pages/third-parties-page/third-parties-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';

export const routes: Routes = [
    {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
            { path: '', title: 'Connexion', component: LoginPageComponent },
            {
                path: '',
                component: LayoutComponent,
                children: [
                    {
                        path: 'app',
                        data: { roles: ['S_ADMIN', 'ADMIN'] },
                        title: 'Accueil',
                        component: HomePageComponent,
                    },
                    {
                        path: 'accident-reports',
                        data: { roles: ['DRIVER', 'S_ADMIN', 'ADMIN'] },
                        children: [
                            {
                                path: '',
                                title: "Déclarations d'Accident",
                                component: AccidentReportsPageComponent,
                            },
                            {
                                path: 'new',
                                title: "Nouvelle déclaration d'accident",
                                component: ReportPageComponent,
                            },
                            {
                                path: ':year/:noSeq',
                                title: 'Déclarer un accident',
                                component: ReportPageComponent,
                            },
                        ],
                    },
                    {
                        path: 'interventions',
                        data: { roles: ['S_TECH', 'S_ADMIN', 'ADMIN'] },
                        children: [
                            {
                                path: '',
                                title: 'Interventions',
                                component: InterventionsPageComponent,
                            },
                            {
                                path: 'new',
                                title: 'Nouveau devis',
                                component: QuotePageComponent,
                            },
                            {
                                path: ':id',
                                children: [
                                    {
                                        path: '',
                                        title: 'Intervention',
                                        component: InterventionPageComponent,
                                    },
                                    {
                                        path: 'quote',
                                        title: 'Devis',
                                        component: QuotePageComponent,
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        path: 'drivers',
                        title: 'Conducteurs',
                        data: { roles: ['S_ADMIN', 'ADMIN'] },
                        component: DriversPageComponent,
                    },
                    {
                        path: 'bus',
                        title: 'Bus',
                        data: { roles: ['S_ADMIN', 'ADMIN'] },
                        component: BusPageComponent,
                    },
                    {
                        path: 'stops',
                        title: 'Arrêts',
                        data: { roles: ['S_ADMIN', 'ADMIN'] },
                        component: StopsPageComponent,
                    },
                    {
                        path: 'third-parties',
                        title: 'Tiers Impliqués',
                        data: { roles: ['S_ADMIN', 'ADMIN'] },
                        component: ThirdPartiesPageComponent,
                    },
                    {
                        path: 'lines',
                        title: 'Lignes',
                        data: { roles: ['S_ADMIN', 'ADMIN'] },
                        component: LinesPageComponent,
                    },
                    {
                        path: 'routes',
                        title: 'Parcours',
                        data: { roles: ['S_ADMIN', 'ADMIN'] },
                        component: RoutesPageComponent,
                    },
                    {
                        path: 'users',
                        title: 'Utilisateurs',
                        data: { roles: ['ADMIN'] },
                        component: UsersPageComponent,
                    },
                    {
                        path: 'account',
                        title: 'Compte',
                        component: AccountPageComponent,
                    },
                ],
            },
        ],
    },
    {
        path: 'unauthorized',
        title: 'Accès refusé',
        component: ForbiddenPageComponent,
    },
    { path: '**', title: 'Page introuvable', component: PageNotFoundComponent },
];
