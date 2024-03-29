import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home'; //contains index file which exports the class defined in the home.component.ts file
import  { PublicHomeComponent } from './public-home';
import { AuthGuard } from './_helpers';
import { Role } from './_models/role';


const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);
const listingsModule = () => import('./listing/listing.module').then(x => x.ListingModule);
const maintenanceModule = () => import('./maintenance/maintenance.module').then(x => x.MaintenanceModule);
const leaseModule = () => import('./lease/lease.module').then(x => x.LeaseModule);
const publicListingsModule = () => import('./public-listings/public-listings.module').then(x => x.PublicListingsModule);

const testModule = () => import('./test-component/test-component.module').then(x => x.TestComponentModule);


const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] }, 
    { path: 'home', component: PublicHomeComponent},
    { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard],  data: { roles: [Role.Admin] }},
    { path: 'account', loadChildren: accountModule },
    { path: 'listings', loadChildren: listingsModule},
    { path: 'public-listings', loadChildren: publicListingsModule},
    { path: 'maintenance', loadChildren: maintenanceModule},
    //{ path: 'lease', loadChildren: leaseModule, canActivate: [AuthGuard], data: { roles: [Role.Tenant]}},
    { path: 'lease', loadChildren: leaseModule},
    //might have to add listings here and import the listing module
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }


//canActivate: [AuthGuard], data: { roles: [Role.Admin] }
//,  data: { roles: [Role.Admin] }
