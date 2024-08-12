import { Component, OnInit } from '@angular/core';

interface Product {
  name: string;
  price: number;
  imageUrl: string; // Campo para la URL de la imagen
  description?: string; // Campo opcional para la descripción
}

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css'],
})
export class ProductManagementComponent implements OnInit {
  products: Product[] = [];
  name: string = '';
  price: number | null = null;
  imageUrl: string = ''; // Nuevo campo para la URL de la imagen
  description: string = ''; // Nuevo campo para la descripción
  editingIndex: number | null = null;

  ngOnInit() {
    this.loadProducts(); // Cargar productos del localStorage al iniciar
  }

  addProduct() {
    if (this.name && this.price !== null && this.imageUrl) {
      const newProduct: Product = {
        name: this.name,
        price: this.price,
        imageUrl: this.imageUrl, // Agregar URL de la imagen
        description: this.description, // Agregar descripción
      };
      if (this.editingIndex !== null) {
        this.products[this.editingIndex] = newProduct; // Editar producto existente
        this.editingIndex = null; // Resetear el índice de edición
      } else {
        this.products.push(newProduct); // Agregar nuevo producto
      }
      this.saveProducts(); // Guardar productos en localStorage
      this.resetForm();
    }
  }

  editProduct(index: number) {
    this.name = this.products[index].name;
    this.price = this.products[index].price;
    this.imageUrl = this.products[index].imageUrl; // Cargar URL de la imagen
    this.description = this.products[index].description || ''; // Cargar descripción
    this.editingIndex = index; // Establecer el índice de edición
  }

  deleteProduct(index: number) {
    this.products.splice(index, 1); // Eliminar producto
    this.saveProducts(); // Guardar cambios en localStorage
  }

  resetForm() {
    this.name = '';
    this.price = null;
    this.imageUrl = ''; // Resetear URL de la imagen
    this.description = ''; // Resetear descripción
  }

  saveProducts() {
    localStorage.setItem('products', JSON.stringify(this.products)); // Guardar productos en localStorage
  }

  loadProducts() {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      this.products = JSON.parse(storedProducts); // Cargar productos desde localStorage
    }
  }
}
