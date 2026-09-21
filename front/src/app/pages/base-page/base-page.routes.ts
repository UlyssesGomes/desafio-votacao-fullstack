import { Routes } from '@angular/router';

import { PautasDetailPage } from '../pautas-page/pautas-detail-page/pautas-detail-page';
import { PautasPage } from '../pautas-page/pautas-page';

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
                path: 'pautas/:id',
                component: PautasDetailPage
            },
            {
                path: '',
                redirectTo: 'pautas',
                pathMatch: 'full'
            }
        ]
    }
];
