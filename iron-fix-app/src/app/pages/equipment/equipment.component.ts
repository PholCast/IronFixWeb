import { Component, inject, signal } from '@angular/core';
import { Equipment } from '../../shared/interfaces/equipment.interface';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EquipmentService } from '../../shared/services/equipment.service';

@Component({
  selector: 'app-equipment',
  imports: [ReactiveFormsModule],
  templateUrl: './equipment.component.html',
  styleUrl: './equipment.component.css'
})
export class EquipmentComponent {
  modalVisible = false;
  isEditing = false;
  equipments = signal<Equipment[]>([]);

  fb = inject(FormBuilder);
  equipmentService = inject(EquipmentService);

  originalId: string | null = null;

  equipmentForm = this.fb.group({
    id: ['', [Validators.required]],
    type: ['', [Validators.required]],
    location: ['', [Validators.required]],
    status: ['', [Validators.required]],
    image: [''] // Opcional
  });

  ngOnInit() {
    this.loadEquipment();
  }

  loadEquipment() {
    this.equipments.set(this.equipmentService.getEquipment());
  }

  openRegisterModal() {
    this.isEditing = false;
    this.originalId = null;
    this.equipmentForm.reset();
    this.modalVisible = true;
  }

  openEditModal(equipment: Equipment) {
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

  saveEquipment() {
    if (this.equipmentForm.invalid) return;
    const equipmentData = this.equipmentForm.getRawValue() as Equipment; // <-- Este cambio
    if (this.isEditing) {
      this.equipmentService.saveEquipment(equipmentData, this.originalId);
    } else {
      this.equipmentService.saveEquipment(equipmentData);
    }
    this.loadEquipment();
    this.closeModal();
  }

  deleteEquipment(id: string) {
    this.equipmentService.deleteEquipment(id);
    this.loadEquipment();
  }

  closeModal() {
    this.modalVisible = false;
    this.equipmentForm.reset();
    this.originalId = null;
  }
}
