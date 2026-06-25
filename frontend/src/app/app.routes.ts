import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProfilesComponent } from './pages/profiles/profiles.component';
import { LogsComponent } from './pages/logs/logs.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },

    {
        path: 'login',
        component: LoginComponent
    },

    {
        path: '',
        component: MainLayoutComponent,

        children: [

            {
                path: 'dashboard',
                component: DashboardComponent
            },

            {
                path: 'users',
                component: UsersComponent
            },

            {
                path: 'products',
                component: ProductsComponent
            },

            {
                path: 'profiles',
                component: ProfilesComponent
            },

            {
                path: 'logs',
                component: LogsComponent
            }

        ]
    },

    {
        path: '**',
        redirectTo: 'login'
    }
];
