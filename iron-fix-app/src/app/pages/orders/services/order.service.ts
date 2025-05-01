import { Injectable } from '@angular/core';
import { Order } from '../../../shared/interfaces/order.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private storageKey = 'appData';

  private loadData() {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : { users: [], equipment: [], orders: [] };
  }

  private saveData(data: any) {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  getOrders(): Order[] {
    const data = this.loadData();
    return data.orders || [];
  }

  saveOrder(order: Order) {
    const data = this.loadData();
    data.orders = [order,...data.orders]
    this.saveData(data);
  }

  updateOrder(updatedOrder: Order) {
    const data = this.loadData();
    const orders: Order[] = data.orders; 
    data.orders = orders.map((order: Order) =>
      order.title === updatedOrder.title && 
      order.description === updatedOrder.description ? updatedOrder : order
    );
    this.saveData(data);
  }  

}
