import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Equipment } from '../../shared/interfaces/equipment.interface';
import { EquipmentService } from '../equipment/services/equipment.service';

@Component({
  selector: 'app-equipment-info',
  imports: [],
  templateUrl: './equipment-info.component.html',
  styleUrl: './equipment-info.component.css'
})
export class EquipmentInfoComponent {

  equipmentId: string | null = null;
  equipmentData: Equipment | null = null;
  private route = inject(ActivatedRoute);
  private equipmentService = inject(EquipmentService);

  ngOnInit(){
    // Suscripción a los parámetros de la ruta
    this.route.paramMap.subscribe(params => {
      this.equipmentId = params.get('id');
      this.loadEquipmentData(this.equipmentId);
    });
  }

  loadEquipmentData(id: string | null): void {
    if (id) {
      const equipmentList = this.equipmentService.getEquipment();
      this.equipmentData = equipmentList.find(eq => eq.id === id) || null;
    }
  }
}
