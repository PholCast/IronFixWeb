import { Injectable } from '@angular/core';
import { Order } from '../../../shared/interfaces/order.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  

  private saveOrderData(orderList: Order[]) {
    localStorage.setItem('orders', JSON.stringify(orderList));
  }

  getOrders(): Order[] {
    return JSON.parse(localStorage.getItem('orders') || '[]');
  }

  saveOrder(order: Order) {
    const orders = this.getOrders();
    orders.unshift(order)
    this.saveOrderData(orders);
  }

  updateOrder(updatedOrder: Order) {
    let orders = this.getOrders();
    orders = orders.map((order: Order) =>
      order.title === updatedOrder.title && 
      order.description === updatedOrder.description ? updatedOrder : order
    );
    this.saveOrderData(orders);
  }  

}
