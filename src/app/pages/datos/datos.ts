import { Component, OnInit, inject, NgZone, ChangeDetectorRef } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../services/supabase.service';

const SELECTED_PRODUCT_KEY = 'selectedProduct';

interface FormData {
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
}

interface Producto {
  nombre: string;
  desc: string;
}

@Component({
  selector: 'app-datos',
  templateUrl: './datos.html',
  styleUrls: ['./datos.css'],
  standalone: true,
  imports: [
    FormsModule,  // CRÍTICO para ngModel y validación
    CommonModule,
    RouterModule
  ]
})
export class Datos implements OnInit {
  private router = inject(Router);
  private supabaseService = inject(SupabaseService);
  private ngZone = inject(NgZone);
  private cdr = inject(ChangeDetectorRef);

  formData: FormData = {
    nombre: '',
    email: '',
    telefono: '',
    direccion: ''
  };

  productoSeleccionado: Producto | null = null;
  envioExitoso: boolean = false;

  isSubmitting: boolean = false;

  constructor() {
    console.log('Datos component constructor called');
  }

  ngOnInit(): void {
    console.log('Datos component ngOnInit called');
    const storedProduct = localStorage.getItem(SELECTED_PRODUCT_KEY);
    if (storedProduct) {
      try {
        this.productoSeleccionado = JSON.parse(storedProduct);
        console.log('Producto recuperado:', this.productoSeleccionado);
      } catch (e) {
        console.error('Error leyendo producto:', e);
      }
    } else {
      console.warn('No hay producto seleccionado en localStorage');
    }
  }

  /**
   * Procesa el envío del formulario.
   */
  async enviarInformacion(form: NgForm): Promise<void> {
    console.log('enviarInformacion called');
    if (form.valid && this.productoSeleccionado) {
      console.log('Form valid, starting submission...');
      this.isSubmitting = true;
      this.cdr.detectChanges(); // Force update to show spinner

      const datosParaBD = {
        nombre: this.formData.nombre,
        correo: this.formData.email,
        telefono: this.formData.telefono,
        direccion: this.formData.direccion,
        // producto: this.productoSeleccionado.nombre, // TODO: Agregar columna 'producto' en Supabase si se desea guardar
      };

      try {
        console.log('Calling supabaseService.insertContact...');
        await this.supabaseService.insertContact(datosParaBD);
        console.log('--- SOLICITUD ENVIADA A SUPABASE ---');

        this.ngZone.run(() => {
          console.log('Inside ngZone run (success)');
          this.envioExitoso = true;
          this.isSubmitting = false;
          this.cdr.detectChanges(); // Force update to show success message
          console.log('State updated: envioExitoso=', this.envioExitoso, 'isSubmitting=', this.isSubmitting);
        });
        localStorage.removeItem(SELECTED_PRODUCT_KEY);
      } catch (error: any) {
        console.error('Error enviando a Supabase:', error);
        this.ngZone.run(() => {
          console.log('Inside ngZone run (error)');
          alert(`Hubo un error al enviar tu solicitud: ${error.message || JSON.stringify(error)}`);
          this.isSubmitting = false;
          this.cdr.detectChanges(); // Force update to reset button
        });
      }

    } else {
      // ESTA PARTE ARREGLA LA VALIDACIÓN: Asegura que los mensajes de error se muestren
      Object.keys(form.controls).forEach(key => {
        const control = form.controls[key];
        control.markAsDirty();
        control.markAsTouched();
        control.updateValueAndValidity();
      });
      console.error('El formulario no es válido.');
    }
  }
}
