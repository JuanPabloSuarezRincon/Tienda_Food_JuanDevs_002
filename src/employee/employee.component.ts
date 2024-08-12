import { Component, OnInit } from '@angular/core';

interface Product {
  name: string;
  price: number;
}

interface Order {
  product: Product;
  status: string;
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  orders: Order[] = [];

  ngOnInit() {
    this.loadOrders(); // Cargar pedidos del localStorage al iniciar
  }

  loadOrders() {
    const storedOrders = localStorage.getItem('orders');
    if (storedOrders) {
      this.orders = JSON.parse(storedOrders); // Cargar pedidos desde localStorage
    }
  }

  completeOrder(order: Order) {
    order.status = 'Completo';
    alert(`Pedido completado: ${order.product.name}`);
    this.saveOrders(); // Guardar cambios en localStorage
  }

  saveOrders() {
    localStorage.setItem('orders', JSON.stringify(this.orders)); // Guardar pedidos en localStorage
  }
}
