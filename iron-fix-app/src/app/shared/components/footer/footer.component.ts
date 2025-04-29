import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  authService = inject(AuthService);

  isLoggedUser = this.authService.isLogged;
  
  isTechnician = this.authService.userTechnician;


}
