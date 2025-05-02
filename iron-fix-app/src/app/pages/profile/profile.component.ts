import { Component, inject, OnInit, signal } from '@angular/core';
import { User } from '../../shared/interfaces/user.interface';
import { AuthService } from '../../shared/services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

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
    jobTitle: [''],
    phone: ['',[Validators.pattern('^[0-9]+$')]],
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

  onOpenEditModal() {
    const user = this.currentUser();
    if (user) {
      this.fillForm(user); 
      this.originalUsername = user.username;
      this.originalEmail = user.email;
    }
    this.modalVisible = true;
  }

  onCloseModal() {
    this.modalVisible = false;
    this.profileForm.reset();  

  }

  onUpdateUser() {
    if (this.profileForm.invalid) {
      // Validar específicamente el teléfono y el correo
      if (this.profileForm.controls['phone'].invalid) {
        Swal.fire({
          text: 'El teléfono debe ser numérico.',
          icon: 'error'
        });
      } else if (this.profileForm.controls['email'].invalid) {
        Swal.fire({
          text: 'El correo electrónico no es válido.',
          icon: 'error'
        });
      } else {
        Swal.fire({
          text: 'Por favor, complete todos los campos requeridos.',
          icon: 'error'
        });
      }
      return;
    }
    
    const updatedUser: User = this.profileForm.getRawValue() as User;

    const result = this.authService.updateUser(updatedUser,this.originalUsername,this.originalEmail);

    if (result.success) {
      this.currentUser.set(updatedUser);
      Swal.fire({
        text: 'Perfil actualizado correctamente.',
        icon: 'success'
      });
      this.onCloseModal();
    }else{
      Swal.fire({
              text: result.message,
              icon: "error"
            });
    }
  }

}
