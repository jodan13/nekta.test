import { NgModule, Provider } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptor } from './shared/auth.interceptor';
import { AppComponent } from './app.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { DeviceListComponent } from './device-list/device-list.component';
import { AuthService } from './shared/services/auth.service';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
}
@NgModule({
  declarations: [
    AppComponent,
    AuthorizationComponent,
    DeviceListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [AuthService, INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule { }
