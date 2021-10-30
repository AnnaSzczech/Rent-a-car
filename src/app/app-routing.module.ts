import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminUsersComponent } from "./admin-users/admin-users.component";
import { CreateCarComponent } from "./create-car/create-car.component";
import { LoginComponent } from "./login/login.component";
import { MainPageComponent } from "./main-page/main-page.component";
import { ManageReservationsComponent } from "./manage-reservations/manage-reservations.component";
import { RegisterComponent } from "./register/register.component";
import { AuthGuard } from "./service/auth.guard";

const routers: Routes = [
    { path: "", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    { path: "main", component: MainPageComponent, canActivate: [AuthGuard] },
    { path: "create-car", component: CreateCarComponent, canActivate: [AuthGuard] },
    { path: "manage", component: ManageReservationsComponent, canActivate: [AuthGuard] },
    { path: "users", component: AdminUsersComponent, canActivate: [AuthGuard] }
]

@NgModule({
    imports: [RouterModule.forRoot(routers)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}