import { Component, inject, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Order } from '../../shared/interfaces/order.interface';
import { OrderService } from './services/order.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css','../../shared/components/hero/hero.component.css']
})
export class OrdersComponent {
  
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

  openNewOrderModal() {
    this.modalVisible = true;
    this.orderForm.reset();
  }

  saveOrder(){
    if (this.orderForm.invalid) return;
    const newOrder = this.orderForm.getRawValue() as Order;
    this.orderService.saveOrder(newOrder);
    this.orders.update((prev) => [newOrder,...prev ]);
    this.closeModal();

  }

  closeModal(){
    this.modalVisible = false;

  }

  acceptOrder(order: Order){
    const updatedOrder = { ...order, accepted: true };
  
    this.orders.update(current =>
      current.map(o => o === order ? updatedOrder : o)
    );
  
    this.orderService.updateOrder(updatedOrder);
  }
  
  
}