import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./shared/services/auth.guard";
import { AuthorizationComponent } from "./authorization/authorization.component";
import { DeviceListComponent } from "./device-list/device-list.component";

const routes: Routes = [
  {path:'', component:AuthorizationComponent},
  {path:'device-list', component:DeviceListComponent, canActivate:[AuthGuard]}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
