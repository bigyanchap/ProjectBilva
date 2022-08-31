import { AuthGuard } from './pages/auth/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedsEUComponent } from './pages/feed-enduser/feeds-eu/feeds-eu.component';
import { PageNotFoundComponent } from './pages/wildcard/wildcard.component';

const routes: Routes = [
  {
    path:'feeds-eu',
    component: FeedsEUComponent
  },
  {
    path: '',
    redirectTo: 'feeds-eu',
    pathMatch: 'full'
  }, /* redirect to the component anyone has access to.*/
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m=>m.AuthModule)
  },/*LAZY-LOADING AuthModule*/
  {
    path: 'feed-admin',
    loadChildren: () => import('./pages/feed-admin/feed-admin.module').then(m=>m.FeedAdminModule)
  },/*LAZY-LOADING FeedAdminModule*/
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
