import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SeccionManual {
  id: string;
  titulo: string;
  imagen: string;   // Ruta relativa dentro de assets
  descripcion: string;
}

@Component({
  selector: 'app-manual',
  templateUrl: './manual.html',
  styleUrls: ['./manual.css'],
  standalone: true,
  imports: [CommonModule]
})
export class Manual {
  secciones: SeccionManual[] = [
    {
      id: 'login',
      titulo: 'Login',
      imagen: '../../../assets/Login.png',
      descripcion: 'Pantalla de login donde el usuario ingresa su correo y contraseña.'
    },
    {
      id: 'menu',
      titulo: 'Menú Principal',
      imagen: '../../../assets/Menu.png',
      descripcion: 'Vista principal del sistema con acceso a todas las secciones.'
    },
    {
      id: 'ventas',
      titulo: 'Ventas',
      imagen: '../../../assets/Ventas.png',
      descripcion: 'Pantalla para gestionar ventas, registrar clientes y productos vendidos.'
    },
    {
      id: 'Prediccion',
      titulo: 'Prediccion',
      imagen: '../../../assets/Prediccion.png',
      descripcion: 'Sección donde se muestran el inventario general basado en los datos acumulados.'
    },
    {
      id: 'empleados',
      titulo: 'Empleados',
      imagen: '../../../assets/Empleados.png',
      descripcion: 'Gestión de empleados: agregar, editar y eliminar registros.'
    },
    {
      id: 'producto',
      titulo: 'Producto',
      imagen: '../../../assets/Producto.png',
      descripcion: 'Gestión de productos: agregar stock, editar información y visualizar inventario.'
    }
  ];

  seccionActual: string = 'login';

  cambiarSeccion(seccion: string) {
    this.seccionActual = seccion;
  }
}