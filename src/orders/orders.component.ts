import { Component, OnInit } from '@angular/core';

interface Product {
  name: string;
  price: number;
}

interface Order {
  products: Product[];
  total: number;
  date: Date;
  status: string; // Agregar estado
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orders: Order[] = []; // Pedidos pendientes
  deliveredOrders: Order[] = []; // Pedidos entregados
  editingOrder: Order | null = null; // Pedido en edición
  editingIndex: number | null = null; // Índice del pedido en edición

  ngOnInit() {
    this.loadOrders(); // Cargar pedidos desde localStorage al iniciar
  }

  loadOrders() {
    const storedOrders = localStorage.getItem('orders');
    if (storedOrders) {
      const allOrders: Order[] = JSON.parse(storedOrders);
      this.orders = allOrders.filter(
        (order: Order) => order.status !== 'Entregado'
      );
      this.deliveredOrders = allOrders.filter(
        (order: Order) => order.status === 'Entregado'
      );
    }
  }

  removeOrder(index: number, list: 'orders' | 'deliveredOrders') {
    if (list === 'orders') {
      this.orders.splice(index, 1); // Eliminar de la lista de pedidos pendientes
    } else {
      this.deliveredOrders.splice(index, 1); // Eliminar de la lista de pedidos entregados
    }
    this.saveOrders(); // Guardar cambios en localStorage
  }

  markAsDelivered(index: number) {
    const deliveredOrder = { ...this.orders[index], status: 'Entregado' }; // Cambiar el estado a entregado
    this.deliveredOrders.push(deliveredOrder); // Agregar a la lista de pedidos entregados
    this.orders.splice(index, 1); // Eliminar de la lista de pedidos pendientes
    this.saveOrders(); // Guardar cambios en localStorage
  }

  editOrder(index: number, list: 'orders' | 'deliveredOrders') {
    if (list === 'orders') {
      this.editingOrder = { ...this.orders[index] }; // Clonar el pedido para editar
      this.editingIndex = index; // Guardar el índice del pedido en edición
    } else {
      alert('No se puede editar un pedido entregado.');
    }
  }

  saveEdit() {
    if (this.editingIndex !== null && this.editingOrder) {
      this.orders[this.editingIndex] = this.editingOrder; // Actualizar el pedido
      this.saveOrders(); // Guardar cambios en localStorage
      this.editingOrder = null; // Limpiar el estado de edición
      this.editingIndex = null; // Limpiar el índice
    }
  }

  cancelEdit() {
    this.editingOrder = null; // Limpiar el estado de edición
    this.editingIndex = null; // Limpiar el índice
  }

  saveOrders() {
    const allOrders = [...this.orders, ...this.deliveredOrders]; // Combina ambas listas
    localStorage.setItem('orders', JSON.stringify(allOrders)); // Guardar los pedidos en localStorage
  }
}
