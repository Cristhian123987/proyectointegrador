import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule
  ],
  templateUrl: './app.html', 
  styleUrl: './app.css',
  standalone: true 
})
export class App {
  protected readonly title = signal('Sistema de Inventario');
}
