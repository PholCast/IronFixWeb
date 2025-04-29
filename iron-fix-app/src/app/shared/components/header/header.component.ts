import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  authService = inject(AuthService);

  router = inject(Router);

  isLoggedUser = this.authService.isLogged;

  isTechnician = this.authService.userTechnician;

  onLogout(){
    this.authService.logout();
    this.router.navigateByUrl('login');
  }

}
