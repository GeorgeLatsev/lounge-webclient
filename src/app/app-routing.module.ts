import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivateRoomsLayoutComponent } from './components/private-rooms-layout/private-rooms-layout.component';
import { AuthorizationGuard } from './core/services/auth-guard.service';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthorizationGuard],
    children: [
      {
        path: '',
        component: PrivateRoomsLayoutComponent,
        children: [
          {
            path: 'home',
            component: HomeComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
