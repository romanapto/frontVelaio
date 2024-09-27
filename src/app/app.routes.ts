import { RouterModule,Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { TareasComponent } from './components/tareas/tareas.component';

export const ROUTES: Routes = [
    {path: 'home',component: HomeComponent},
    {path: 'search',component: SearchComponent},
    {path: 'tarea/:id',component: TareasComponent},
    //{ path: 'usuario/:id/:title', component: UsuarioComponent },
    {path: '', pathMatch: 'full',redirectTo: 'home'},
    {path: '**', pathMatch: 'full',redirectTo: 'home'}
];

export const app_routing = RouterModule.forRoot(ROUTES,{useHash:true});