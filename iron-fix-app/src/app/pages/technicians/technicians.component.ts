import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TechnicianService } from './services/technician.service';
import { User } from '../../shared/interfaces/user.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-technicians',
  imports: [ReactiveFormsModule],
  templateUrl: './technicians.component.html',
  styleUrls: ['./technicians.component.css','../../shared/components/hero/hero.component.css']
})
export class TechniciansComponent implements OnInit  {
  modalVisible = false;
  isEditing = false;
  technicians = signal<User[]>([]);
  
  fb = inject(FormBuilder);
  technicianService = inject(TechnicianService);

  originalUsername: string | null = null;


  technicianForm = this.fb.group({
    fullname: ['', [Validators.required]],
    username: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
    company:['', [Validators.required]],
    phone:[''],
    role: ['technician']
  });

  ngOnInit() {
    this.loadTechnicians();
  }

  loadTechnicians() {
    this.technicians.set(this.technicianService.getTechnicians());  
  }

  onOpenRegisterModal() {
    this.isEditing = false;
    this.originalUsername = null;
    this.technicianForm.reset({role: 'technician'});
    this.modalVisible = true;
  }

  onOpenEditModal(technician: User) {
    this.isEditing = true;
    this.originalUsername = technician.username;
    this.technicianForm.setValue({
      fullname: technician.fullname,
      username: technician.username,
      email: technician.email,
      phone: technician.phone,
      company: technician.company,
      password: technician.password,
      role: technician.role
    });
    this.modalVisible = true;
  }

  onSaveTechnician() {
    if (this.technicianForm.invalid) return;

    const technicianData = this.technicianForm.getRawValue() as User;
    
    let result: boolean | 'username' | 'email';

    if (this.isEditing) {
      result = this.technicianService.saveTechnician(technicianData,this.originalUsername);
    } else {
      result = this.technicianService.saveTechnician(technicianData); 
    }

    if (result === 'username') {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'El nombre de usuario ya está en uso.',
      });
      return;
    }
  
    if (result === 'email') {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'El correo electrónico ya está en uso.',
      });
      return;
    }
    
    
    Swal.fire({
      icon: 'success',
      title: this.isEditing ? '¡Cambios guardados!' : '¡Técnico registrado!',
      text: this.isEditing
        ? 'Los cambios en el técnico fueron guardados exitosamente.'
        : 'Técnico registrado exitosamente.'
    });
    this.loadTechnicians();
    this.onCloseModal();
  }

  onDeleteTechnician(username: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará al técnico permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#ff4d4f',
      cancelButtonColor: '#0052e0',
    }).then((result) => {
      if (result.isConfirmed) {
        this.technicianService.deleteTechnician(username);
        this.loadTechnicians();
        Swal.fire({
          icon: 'success',
          title: '¡Eliminado!',
          text: 'El técnico fue eliminado correctamente.'
        });
      }
    });
  }

  onCloseModal() {
    this.modalVisible = false;
    this.technicianForm.reset({role: 'technician'});
    this.originalUsername = null;  

  }
}
