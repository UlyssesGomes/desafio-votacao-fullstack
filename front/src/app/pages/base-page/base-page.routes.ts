import { Routes } from '@angular/router';

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
                path: '',
                redirectTo: 'pautas',
                pathMatch: 'full'
            }
        ]
    }
];
