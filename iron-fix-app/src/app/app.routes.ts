import { Routes } from '@angular/router';
import { OrdersComponent } from './pages/orders/orders.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TechniciansComponent } from './pages/technicians/technicians.component';
import { EquipmentInfoComponent } from './pages/equipment-info/equipment-info.component';
import { EquipmentComponent } from './pages/equipment/equipment.component';
import { authGuard } from './shared/guards/auth.guard';
import { noAuthGuard } from './shared/guards/no-auth.guard';
import { technicianGuard } from './shared/guards/technician.guard';

export const routes: Routes = [
    
    {
        path:'equipment',
        component:EquipmentComponent,
        title:'IronFix - Equipos',
        canActivate:[authGuard]
    },
    {
        path:'equipment-info/:id',
        component:EquipmentInfoComponent,
        canActivate:[authGuard]
    },
    {
        path:'login',
        component:LoginComponent,
        title:'IronFix - Login',
        canActivate:[noAuthGuard]
    },
    {
        path:'',
        component:OrdersComponent,
        title:'IronFix - Órdenes',
        canActivate:[authGuard]
    },
    {
        path:'profile',
        component:ProfileComponent,
        title:'IronFix - Perfil',
        canActivate:[authGuard]
    },
    {
        path:'sign-up',
        component:SignUpComponent,
        title:'IronFix - Registro',
        canActivate:[noAuthGuard]
    },
    {
        path:'technicians',
        component:TechniciansComponent,
        title:'IronFix - Técnicos',
        canActivate:[authGuard,technicianGuard]
    },
    {
        path:'**',
        redirectTo: '',
        pathMatch:'full'
    },
];
