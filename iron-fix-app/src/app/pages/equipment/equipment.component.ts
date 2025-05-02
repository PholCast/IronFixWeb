import { Component, inject, OnInit, signal } from '@angular/core';
import { Equipment } from '../../shared/interfaces/equipment.interface';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EquipmentService } from '../../shared/services/equipment.service'
import { AuthService } from '../../shared/services/auth.service';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-equipment',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css','../../shared/components/hero/hero.component.css']
})
export class EquipmentComponent implements OnInit {
  modalVisible = false;
  isEditing = false;
  equipments = signal<Equipment[]>([]);

  fb = inject(FormBuilder);
  equipmentService = inject(EquipmentService);

  originalId: string | null = null;

  authService = inject(AuthService);

  isTechnician = this.authService.userTechnician;

  equipmentForm = this.fb.group({
    id: ['', [Validators.required]],
    type: ['', [Validators.required]],
    location: ['', [Validators.required]],
    status: ['', [Validators.required]],
    image: ['']
  });

  ngOnInit() {
    this.loadEquipment();
  }

  loadEquipment() {
    this.equipments.set(this.equipmentService.getEquipment());
  }

  onOpenRegisterModal() {
    this.isEditing = false;
    this.originalId = null;
    this.equipmentForm.reset();
    this.modalVisible = true;
  }

  onOpenEditModal(equipment: Equipment) {
    this.isEditing = true;
    this.originalId = equipment.id;
    this.equipmentForm.setValue({
      id: equipment.id,
      type: equipment.type,
      location: equipment.location,
      status: equipment.status,
      image: equipment.image || ''
    });
    this.modalVisible = true;
  }

  onSaveEquipment() {
    if (this.equipmentForm.invalid) return;

    const equipmentData = this.equipmentForm.getRawValue() as Equipment;
    let saved: boolean;

    if (this.isEditing) {
      saved = this.equipmentService.saveEquipment(equipmentData, this.originalId);
    } else {
      saved = this.equipmentService.saveEquipment(equipmentData);
    }
    if(!saved){
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'El ID ingresado ya existe',
      });
      return;
    }

    Swal.fire({
      icon: 'success',
      title: this.isEditing ? '¡Equipo actualizado!' : '¡Equipo registrado!',
      text: this.isEditing
        ? 'Los cambios en el equipo fueron guardados exitosamente.'
        : 'Equipo registrado exitosamente.'
    });

    this.loadEquipment();
    this.onCloseModal();
  }

  onDeleteEquipment(id: string) {
    Swal.fire({
      title: '¿Eliminar equipo?',
      text: `¿Estás seguro de que deseas eliminar el equipo con ID "${id}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#ff4d4f',
      cancelButtonColor: '#0052e0',
    }).then((result) => {
      if (result.isConfirmed) {
        this.equipmentService.deleteEquipment(id);
        this.loadEquipment();
        Swal.fire({
          icon: 'success',
          title: '¡Eliminado!',
          text: `El equipo con ID "${id}" fue eliminado correctamente.`
        });
      }
    });
  }

  onCloseModal() {
    this.modalVisible = false;
    this.equipmentForm.reset();
    this.originalId = null;
  }
}
