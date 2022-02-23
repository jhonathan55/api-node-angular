import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {  CheckLoginGuard } from './auth/guards/check-login.guard';
import { CookiesInterceptor } from './auth/interceptor/cookies.interceptor';

const routes: Routes = [

  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'notFound', loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule) },
  { path: 'admin', loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule) },
  { path: 'login', loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule),canActivate:[CheckLoginGuard] },
  { path: 'list', loadChildren: () => import('./auth/list/list.module').then(m => m.ListModule) },
  { path: 'prod-list', loadChildren: () => import('./product/list/list.module').then(m => m.ListModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
