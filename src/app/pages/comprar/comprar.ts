import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// Clave para guardar/recuperar la selección en el navegador
export const SELECTED_PRODUCT_KEY = 'selectedProduct';

interface Producto {
  nombre: string;
  desc: string;
}

@Component({
  selector: 'app-comprar',
  templateUrl: './comprar.html',
  styleUrls: ['./comprar.css'],
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule
  ]
})
export class Comprar implements OnInit {
  private router = inject(Router);

  // Lista de versiones del software (SIN PRECIOS)
  productos: Producto[] = [
    { 
      nombre: 'Sistema Básico', 
      desc: 'Ideal para pequeñas tiendas. Incluye gestión de inventario simple, entradas/salidas y acceso para un solo usuario.'
    },
    { 
      nombre: 'Sistema Pro', 
      desc: 'Solución completa para empresas en crecimiento. Incluye multi-sucursal, reportes avanzados de BI, alertas de stock y usuarios ilimitados.'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    // Limpiamos la selección anterior al cargar
    localStorage.removeItem(SELECTED_PRODUCT_KEY);
  }

  /**
   * Guarda la versión seleccionada y navega a /datos.
   */
  seleccionarVersion(producto: Producto): void {
    // 1. Guardar la selección
    localStorage.setItem(SELECTED_PRODUCT_KEY, JSON.stringify(producto));
    
    // 2. Navegar al formulario
    this.router.navigate(['/datos']);
  }
}