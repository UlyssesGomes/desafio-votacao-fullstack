import { Routes } from '@angular/router';

import { NotFoundPage } from '../not-found-page/not-found-page';
import { PautasCreatePage } from '../pautas-page/pautas-create-page/pautas-create-page';
import { PautasDetailPage } from '../pautas-page/pautas-detail-page/pautas-detail-page';
import { PautasPage } from '../pautas-page/pautas-page';
import { VotarPage } from '../votar-page/votar-page';

export const basePageRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./base-page').then(h => h.BasePage),
        children: [
            {
                path: 'pautas',
                component: PautasPage
            },
            {
                path: 'pautas/create',
                component: PautasCreatePage
            },
            {
                path: 'pautas/:id',
                component: PautasDetailPage
            },
            {
                path: 'votar',
                component: VotarPage
            },
            {
                path: '',
                redirectTo: 'pautas',
                pathMatch: 'full'
            },
            { path: '**', component: NotFoundPage }
        ]
    }
];
