import { Component, OnInit } from '@angular/core';

interface Product {
  name: string;
  price: number;
  imageUrl: string;
  description?: string;
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  products: Product[] = [];

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      this.products = JSON.parse(storedProducts);
    }
  }

  order(product: Product) {
    // Obtener el carrito actual del localStorage o inicializarlo como un array vacío
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');

    // Agregar el producto al carrito
    cart.push(product);

    // Guardar el carrito actualizado en el localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Mostrar un mensaje de confirmación
    alert(`${product.name} ha sido agregado al carrito.`);
  }
}
