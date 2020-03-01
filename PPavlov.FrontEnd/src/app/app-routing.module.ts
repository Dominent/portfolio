import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './areas/home/pages/index/home.component';
import { AuthGuardService } from './components/auth/auth-guard.service';
import { ProjectsComponent } from './areas/admin/pages/projects/projects.component';
import { ProjectDetailsComponent } from './areas/admin/pages/projects/project-details/project-details.component';
import { AuthLoginComponent } from './pages/login/auth-login.component';
import { DashboardComponent } from './areas/admin/pages/dashoard/dashboard.component';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'admin',
    canActivate: [AuthGuardService],
    component: DashboardComponent,
    children: [
      { path: 'projects', component: ProjectsComponent },
      { path: 'projects/:id/details', component: ProjectDetailsComponent }
    ]
  },
  {
    path: 'auth', children: [
      { path: 'login', component: AuthLoginComponent },
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
