import { Component, inject, OnInit } from '@angular/core';
import { User } from '../../shared/interfaces/user.interface';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  currentUser: User | null = null;
  authService = inject(AuthService)

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
  }

}
