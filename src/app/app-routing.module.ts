import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/pages/not-found/not-found.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { PublicGuard } from './auth/guards/public.guard';

const routes: Routes = [
    {
      path: 'auth',
      loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
      canActivate: [PublicGuard],
      canMatch: [PublicGuard]
    },
    {
      path: 'heroes',
      loadChildren: () => import('./heroes/heroes.module').then(m => m.HeroesModule),
      canActivate: [AuthGuard],
      canMatch: [AuthGuard]
    },
    {
      path:'',
      redirectTo: 'heroes',
      pathMatch: 'full'
    },
    {
      path:'404',
      component: NotFoundComponent
    },
    {
      path:'**',
      redirectTo: '404'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
