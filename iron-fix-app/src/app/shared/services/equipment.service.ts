import { Injectable } from '@angular/core';
import { Equipment } from '../interfaces/equipment.interface';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  private saveEquipmentData(equipmentList: Equipment[]) {
    localStorage.setItem('equipment', JSON.stringify(equipmentList));
  }

  getEquipment(): Equipment[] {

    return JSON.parse(localStorage.getItem('equipment') || '[]');
  }

  getEquipmentById(id: string): Equipment | null {
    const equipmentList = this.getEquipment();
    return equipmentList.find((equipment: Equipment) => equipment.id === id) || null;
  }

  // Agregar o actualizar equipo
  saveEquipment(equipment: Equipment, originalId?: string | null): boolean {
    const equipmentList = this.getEquipment();
  
    
    const duplicate = equipmentList.find(e =>
      e.id.toLowerCase() === equipment.id.toLowerCase() &&
      e.id.toLowerCase() !== (originalId || '').toLowerCase()
    );
  
    if (duplicate) return false;
  
    if (originalId) {
      // Editando
      const index = equipmentList.findIndex((e: Equipment) => e.id === originalId);
      if (index !== -1) {
        equipmentList[index] = equipment;
      }
    } else {
      // Creando nuevo
      equipmentList.push(equipment);
    }
  
    this.saveEquipmentData(equipmentList);
    return true;
  }
  

  deleteEquipment(id: string) {
    let equipmentList = this.getEquipment();
    equipmentList = equipmentList.filter((e: Equipment) => e.id !== id);
    this.saveEquipmentData(equipmentList);
  }
}
