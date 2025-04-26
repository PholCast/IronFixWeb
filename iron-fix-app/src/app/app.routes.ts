import { Routes } from '@angular/router';
import { OrdersComponent } from './pages/orders/orders.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TechniciansComponent } from './pages/technicians/technicians.component';
import { EquipmentInfoComponent } from './pages/equipment-info/equipment-info.component';
import { EquipmentComponent } from './pages/equipment/equipment.component';

export const routes: Routes = [

// I think we should add the routes for creating elements later
    
    {
        path:'equipment',
        component:EquipmentComponent,
        title:'IronFix - Equipos'
    },
    {
        path:'equipment-info/:id',
        component:EquipmentInfoComponent
    },
    {
        path:'login',
        component:LoginComponent,
        title:'IronFix - Login'
    },
    {
        path:'',
        component:OrdersComponent,
        title:'IronFix - Órdenes'
    },
    {
        path:'profile',
        component:ProfileComponent,
        title:'IronFix - Perfil'
    },
    {
        path:'sign-up',
        component:SignUpComponent,
        title:'IronFix - Registro'
    },
    {
        path:'technicians',
        component:TechniciansComponent,
        title:'IronFix - Técnicos'
    },
    {
        path:'**',
        redirectTo: '',
        pathMatch:'full'
    },
];
