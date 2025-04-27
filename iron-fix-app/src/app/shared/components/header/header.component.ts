import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  authService = inject(AuthService);

  router = inject(Router);

  isLoggedUser = this.authService.isLogged;


  onLogout(){
    this.authService.logout();
    this.router.navigateByUrl('login');
  }

}
