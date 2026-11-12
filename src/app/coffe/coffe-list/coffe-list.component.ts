import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CoffeService } from '../coffe.service';
import { Coffe } from '../../coffe';

@Component({
  selector: 'app-coffe-list',
  standalone: false,
  templateUrl: './coffe-list.component.html',
  styleUrls: ['./coffe-list.component.css'],
})
export class CoffeListComponent implements OnInit {
  private readonly coffeService = inject(CoffeService);
  readonly coffeList = signal<Coffe[]>([]);
  readonly totalOrigen = computed(() => this.countByTipo('Café de Origen'));
  readonly totalBlend = computed(() => this.countByTipo('Blend'));

  ngOnInit() {
    this.getCoffeList();
  }

  getCoffeList() {
    this.coffeService.getCoffeList().subscribe({
      next: (data) => this.coffeList.set(data),
      error: (error) => console.error('Error fetching coffee list:', error),
    });
  }

  private countByTipo(tipo: string): number {
    return this.coffeList().filter((coffe) => coffe.tipo === tipo).length;
  }
}
