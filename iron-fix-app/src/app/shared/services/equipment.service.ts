import { Injectable } from '@angular/core';
import { Equipment } from '../interfaces/equipment.interface';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  private storageKey = 'appData';

  private loadData() {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : { users: [], equipment: [], orders: [] };
  }

  private saveData(data: any) {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  getEquipment(): Equipment[] {
    const data = this.loadData();
    return data.equipment || [];
  }

  saveEquipment(equipment: Equipment, originalId?: string|null) {
    const data = this.loadData();
    if (originalId) {
      // Editar
      const index = data.equipment.findIndex((e: Equipment) => e.id === originalId);
      if (index !== -1) {
        data.equipment[index] = equipment;
      }
    } else {
      // Nuevo
      data.equipment.push(equipment);
    }
    this.saveData(data);
  }

  deleteEquipment(id: string) {
    const data = this.loadData();
    data.equipment = data.equipment.filter((e: Equipment) => e.id !== id);
    this.saveData(data);
  }
}
