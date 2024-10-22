import { Routes } from '@angular/router';
import { ListComponent } from '@/products/pages/list/list.component';
import { AboutComponent } from '@/info/pages/about/about.component';


export const routes: Routes = [
    {
        path: '',
        component: ListComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
];
