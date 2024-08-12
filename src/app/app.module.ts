import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importar CommonModule si es necesario

import { AppComponent } from './app.component';
import { LoginComponent } from '../login/login.component';
import { HomeComponent } from '../home/home.component';
import { RegisterComponent } from '../register/register.component';
import { CustomerComponent } from '../customer/customer.component';
import { EmployeeComponent } from '../employee/employee.component';
import { ProductManagementComponent } from '../product/product-management.component';
import { OrdersComponent } from '../orders/orders.component';
import { CartComponent } from '../cart/cart.component'; // Importar el nuevo componente

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: 'product-management', component: ProductManagementComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'cart', component: CartComponent } // Ruta para el carrito de compras
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    CustomerComponent,
    EmployeeComponent,
    ProductManagementComponent,
    OrdersComponent,
    CartComponent // Declarar el nuevo componente aquí
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule, // Asegúrate de que esto esté presente
    RouterModule.forRoot(routes) // Configurar las rutas
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}