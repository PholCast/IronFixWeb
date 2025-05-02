import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Equipment } from '../../shared/interfaces/equipment.interface';
import { EquipmentService } from '../../shared/services/equipment.service';

@Component({
  selector: 'app-equipment-info',
  imports: [],
  templateUrl: './equipment-info.component.html',
  styleUrl: './equipment-info.component.css'
})
export class EquipmentInfoComponent implements OnInit{

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
      this.equipmentData = this.equipmentService.getEquipmentById(id) || null;
    }
  }
}
