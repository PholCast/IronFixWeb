import { Component, inject, OnInit, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Order } from '../../shared/interfaces/order.interface';
import { OrderService } from './services/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css','../../shared/components/hero/hero.component.css']
})
export class OrdersComponent implements OnInit {
  
  modalVisible = false;
  
  authService = inject(AuthService);
  
  isTechnician = this.authService.userTechnician;
  
  orders = signal<Order[]>([])
  
  fb = inject(FormBuilder);

  orderForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    accepted: [false]
  });
  orderService = inject(OrderService)

  ngOnInit(){
    this.loadOrders();
  }

  loadOrders(){
    this.orders.set(this.orderService.getOrders());
  }

  onOpenNewOrderModal() {
    this.modalVisible = true;
    this.orderForm.reset();
  }

  onSaveOrder(){
    if (this.orderForm.invalid) return;

    const newOrder = this.orderForm.getRawValue() as Order;
    const saved = this.orderService.saveOrder(newOrder);

    if (!saved) {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'La orden ingresada ya existe',
      });
      return;
    }
    this.orders.update((prev) => [newOrder,...prev ]);
    this.onCloseModal();
    
    Swal.fire({
      icon: 'success',
      title: '¡Orden registrada!',
      text: 'La orden fue creada exitosamente.'
    });

  }

  onCloseModal(){
    this.modalVisible = false;

  }

  onAcceptOrder(order: Order){
    const updatedOrder = { ...order, accepted: true };
  
    this.orders.update(current =>
      current.map(o => o === order ? updatedOrder : o)
    );
  
    this.orderService.updateOrder(updatedOrder);
  }
  
  
}