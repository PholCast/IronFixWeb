import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TechnicianService } from '../../shared/services/technician.service';
import { User } from '../../shared/interfaces/user.interface';

@Component({
  selector: 'app-technicians',
  imports: [ReactiveFormsModule],
  templateUrl: './technicians.component.html',
  styleUrl: './technicians.component.css'
})
export class TechniciansComponent implements OnInit  {
  modalVisible = false;
  isEditing = false;
  technicians = signal<User[]>([]);
  
  fb = inject(FormBuilder);
  technicianService = inject(TechnicianService);  // Inyectar el servicio

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

  openRegisterModal() {
    this.isEditing = false;
    this.originalUsername = null;
    this.technicianForm.reset({role: 'technician'});
    this.modalVisible = true;
  }

  openEditModal(technician: any) {
    console.log("entra a editar")
    console.log(technician)
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

  saveTechnician() {
    if (this.technicianForm.invalid) return;

    const technicianData = this.technicianForm.value;
    if (this.isEditing) {
      console.log('Actualizando técnico:', technicianData);
      this.technicianService.saveTechnician(technicianData,this.originalUsername); // Guardar técnico
    } else {
      console.log('Registrando técnico:', technicianData);
      this.technicianService.saveTechnician(technicianData); // Guardar técnico
    }
    this.loadTechnicians();  // Recargar la lista de técnicos
    this.closeModal();
  }

  deleteTechnician(username: string) {
    this.technicianService.deleteTechnician(username); // Eliminar técnico
    this.loadTechnicians();  // Recargar la lista de técnicos después de eliminar
  }

  closeModal() {
    this.modalVisible = false;
    this.technicianForm.reset({role: 'technician'});
    this.originalUsername = null;  

  }
}
