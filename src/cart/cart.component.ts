import { Component, OnInit } from '@angular/core';

interface Product {
  name: string;
  price: number;
}

interface Order {
  products: Product[];
  total: number;
  date: Date;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];
  total: number = 0;

  ngOnInit() {
    this.loadCart(); // Cargar el carrito desde localStorage al iniciar
  }

  loadCart() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cartItems = JSON.parse(storedCart);
      this.calculateTotal();
    }
  }

  calculateTotal() {
    this.total = this.cartItems.reduce((acc, item) => acc + item.price, 0);
  }

  removeFromCart(index: number) {
    this.cartItems.splice(index, 1); // Eliminar el producto del carrito
    this.saveCart();
    this.calculateTotal();
  }

  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems)); // Guardar el carrito en localStorage
  }

  checkout() {
    if (this.cartItems.length > 0) {
      const newOrder: Order = {
        products: this.cartItems,
        total: this.total,
        date: new Date(),
      };

      // Guardar el pedido en el localStorage
      let orders = JSON.parse(localStorage.getItem('orders') || '[]');
      orders.push(newOrder);
      localStorage.setItem('orders', JSON.stringify(orders));

      alert('Pedido realizado con éxito!');
      this.cartItems = []; // Limpiar el carrito
      this.saveCart();
      this.total = 0;
    } else {
      alert('No hay productos en el carrito para realizar un pedido.');
    }
  }
}
