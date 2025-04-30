import { Component, inject, OnInit, signal } from '@angular/core';
import { User } from '../../shared/interfaces/user.interface';
import { AuthService } from '../../shared/services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  modalVisible = false;
  currentUser = signal<User | null>(null);
  authService = inject(AuthService)
  fb = inject(FormBuilder);


  originalUsername: string = '';
  originalEmail: string = '';

  profileForm = this.fb.group({
    fullname: ['', [Validators.required]],
    username: ['', [Validators.required]],
    company: ['', [Validators.required]],
    jobTitle: ['', [Validators.required]],
    phone: [''],
    email: ['', [Validators.email, Validators.required]],
    password: [''],
    role: ['']
  });


  ngOnInit() {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.currentUser.set(user);
      this.fillForm(user);
    }
  }

  
  fillForm(user: User) {
    this.profileForm.setValue({
      fullname: user.fullname,
      username: user.username,
      company: user.company,
      jobTitle: user.jobTitle || '',
      phone: user.phone || '',
      email: user.email,
      password: user.password,  
      role: user.role
    });
  }

  openEditModal() {
    const user = this.currentUser();
    if (user) {
      this.fillForm(user); 
      this.originalUsername = user.username;
      this.originalEmail = user.email;
    }
    this.modalVisible = true;
  }

  closeModal() {
    this.modalVisible = false;
    this.profileForm.reset();  

  }

  // Método para actualizar el usuario llamando al servicio
  updateUser() {
    if (this.profileForm.invalid) {
      return;
    }
    const updatedUser: User = this.profileForm.getRawValue() as User;

    const success = this.authService.updateUser(updatedUser,this.originalUsername,this.originalEmail);

    if (success) {
      this.currentUser.set(updatedUser);  // Actualizamos la signal
      this.closeModal();
    }
  }

}
