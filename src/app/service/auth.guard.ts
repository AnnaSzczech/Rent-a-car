import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { UserService } from "./user.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private userService: UserService, private router: Router) {}

    canActivate() {
        if (this.userService.authenticated.value) {
            return true;
        } else {
            this.router.navigateByUrl('/');
            return false;
        }
    }
}