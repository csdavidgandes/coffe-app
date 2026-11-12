import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { CoffeListComponent } from './coffe-list.component';
import { environment } from '../../../environments/environment';

describe('CoffeListComponent', () => {
  let component: CoffeListComponent;
  let fixture: ComponentFixture<CoffeListComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoffeListComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(CoffeListComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => httpMock.verify());

  it('should create', () => {
    httpMock.expectOne(environment.coffeeDataUrl).flush([]);
    expect(component).toBeTruthy();
  });

  it('should render a table row per coffee', () => {
    httpMock.expectOne(environment.coffeeDataUrl).flush([
      { id: 1, nombre: 'Café Especial para ti', tipo: 'Blend', region: 'Angelópolis, Antioquia', sabor: '', altura: 0, imagen: '' },
      { id: 2, nombre: 'Café Especial Navegante', tipo: 'Café de Origen', region: 'Guatapé, Antioquia', sabor: '', altura: 0, imagen: '' },
    ]);
    fixture.detectChanges();

    const rows = (fixture.nativeElement as HTMLElement).querySelectorAll('tbody tr');
    expect(rows.length).toBe(2);
    expect(rows[1].textContent).toContain('Café Especial Navegante');
    expect(component.totalOrigen()).toBe(1);
    expect(component.totalBlend()).toBe(1);
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Total café de origen: 1');
    expect(text).toContain('Total café blend: 1');
  });
});
