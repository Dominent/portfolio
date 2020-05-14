import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../@material/material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule, ActionReducerMap, ActionReducer, Action, MetaReducer } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationDialogComponent } from './components/shared/confirmation/confirmation.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { LoadingEffects } from './store/effects/loading.effects';
import { EffectsModule } from '@ngrx/effects';
import { loadingReducer } from './store/reducers/loading.reducer';
import { ProjectEffects } from './store/effects/project.effects';
import { ProjectService } from './services/project.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AlertService } from './services/alert.service';
import { AuthService } from './services/auth.service';
import { AuthEffects } from './store/effects/auth.effects';
import { AuthTokenInterceptor } from './components/auth/auth-token.interceptor';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { AppState } from './store/app.state';
import { localStorageSync } from 'ngrx-store-localstorage';
import { projectReducer } from './store/reducers/project.reducer';
import { authReducer } from './store/reducers/auth.reducer';
import { AuthLoginComponent } from './pages/login/auth-login.component';
import { FhUploadComponent } from './components/shared/input/fh-upload/fh-upload.component';
import { FhButtonComponent } from './components/shared/input/fh-button/fh-button.component';
import { ProjectsComponent } from './areas/admin/pages/projects/projects.component';
import { ProjectDetailsComponent } from './areas/admin/pages/projects/project-details/project-details.component';
import { ProjectAddDialogComponent } from './areas/admin/components/project/project-add/project-add.component';
import { ProjectDetailsAddDialogComponent } from './areas/admin/components/project/project-details/project-details-add/project-details-add.component';
import { AuthGuardService } from './components/auth/auth-guard.service';
import { DashboardComponent } from './areas/admin/pages/dashoard/dashboard.component';

const STORE_KEYS_TO_PERSIST = ['auth'];

export const reducers: ActionReducerMap<AppState> = {
  project: projectReducer,
  auth: authReducer,
  loading: loadingReducer
}

export function localStorageSyncReducer(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return localStorageSync({
    keys: STORE_KEYS_TO_PERSIST,
    rehydrate: true,
  })(reducer);
}

export const metaReducers: Array<MetaReducer<AppState, Action>> = [localStorageSyncReducer];

@NgModule({
  declarations: [
    AppComponent,
    AuthLoginComponent,
    ConfirmationDialogComponent,

    FhUploadComponent,
    FhButtonComponent,

    DashboardComponent,
    ProjectsComponent,
    ProjectDetailsComponent,
    ProjectAddDialogComponent,
    ProjectDetailsAddDialogComponent
  ],
  imports: [
    MaterialModule,
    HttpClientModule,
    StoreModule.forRoot(
      reducers,
      {metaReducers}
    ),
    !environment.PRODUCTION ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([
      LoadingEffects,
      ProjectEffects,
      AuthEffects
    ]),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  entryComponents: [
    ConfirmationDialogComponent,
    ProjectAddDialogComponent,
    ProjectDetailsAddDialogComponent
  ],
  providers: [
    { 
      provide: MAT_DATE_LOCALE,
      useValue: 'en-GB'
    }, /* dd/MM/yyyy format for datepicker */
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true
    },
    AuthService,
    AuthGuardService,
    AlertService,
    ProjectService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
