import { Component, inject, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  fb = inject(FormBuilder);

  showModal = signal(false);

  orders = signal([
    {
      title: 'Revisión de aire acondicionado',
      description: 'El aire acondicionado de la suite presidencial (Piso 10, Habitación 1001) no enfría adecuadamente.',
      imageUrl: 'assets/AireAcondicionado.jpg',
      accepted: false
    },
    {
      title: 'Fuga en tubería de baño',
      description: 'Se reporta una fuga de agua en la tubería del baño principal del lobby.',
      imageUrl: 'assets/tuberiaBaño.jpg',
      accepted: false
    },
    {
      title: 'Revisión de aire acondicionado',
      description: 'El aire acondicionado de la suite presidencial (Piso 10, Habitación 1001) no enfría adecuadamente.',
      imageUrl: 'assets/AireAcondicionado.jpg',
      accepted: false
    },
    {
      title: 'Fuga en tubería de baño',
      description: 'Se reporta una fuga de agua en la tubería del baño principal del lobby.',
      imageUrl: 'assets/tuberiaBaño.jpg',
      accepted: false
    },
    {
      title: 'Fuga en tubería de baño',
      description: 'Se reporta una fuga de agua en la tubería del baño principal del lobby.',
      imageUrl: 'assets/tuberiaBaño.jpg',
      accepted: false
    },
    {
      title: 'Revisión de aire acondicionado',
      description: 'El aire acondicionado de la suite presidencial (Piso 10, Habitación 1001) no enfría adecuadamente.',
      imageUrl: 'assets/AireAcondicionado.jpg',
      accepted: false
    },
    {
      title: 'Fuga en tubería de baño',
      description: 'Se reporta una fuga de agua en la tubería del baño principal del lobby.',
      imageUrl: 'assets/tuberiaBaño.jpg',
      accepted: false
    },
    {
      title: 'Revisión de aire acondicionado',
      description: 'El aire acondicionado de la suite presidencial (Piso 10, Habitación 1001) no enfría adecuadamente.',
      imageUrl: 'assets/AireAcondicionado.jpg',
      accepted: false
    }
  ]);

  orderForm = this.fb.group({
    title: [''],
    description: [''],
  });

  isFormValid = computed(() => this.orderForm.valid);

  constructor() {
          const savedOrders = localStorage.getItem('appData');
      let orders = [];

      if (savedOrders) {
        const appData = JSON.parse(savedOrders);
        orders = appData.orders || []; // Asegura que orders sea un arreglo, incluso si no existe la propiedad.
      }

      // Solo si hay órdenes guardadas, las usamos
      if (Array.isArray(orders) && orders.length > 0) {
        this.orders.set(orders);
      }
    // Guardar las órdenes de nuevo en appData cuando cambien
    effect(() => {
      const appData = JSON.parse(localStorage.getItem('appData') || '{}');
      appData.orders = this.orders(); // Actualiza las órdenes
      localStorage.setItem('appData', JSON.stringify(appData)); // Guarda el objeto completo
    });
  }

  openModal() {
    this.orderForm.reset();
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  }

  addOrder() {
    console.log("Formulario enviado:", this.orderForm.value); // Debug
    console.log("Formulario válido:", this.isFormValid()); // Debug
  
    const { title, description } = this.orderForm.getRawValue();
  
    this.orders.update(current => [
      { title: title ?? '', description: description ?? '', imageUrl: '', accepted: false },  // Nueva orden al principio
      ...current // Las órdenes existentes
    ]);      
  
    this.closeModal();
  }

  acceptOrder(order: { title: string; description: string; imageUrl: string; accepted: boolean }) {
    this.orders.update(current =>
      current.map(o => o === order ? { ...o, accepted: true } : o)
    );
  }
}
