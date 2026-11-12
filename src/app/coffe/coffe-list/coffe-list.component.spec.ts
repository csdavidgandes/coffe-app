import { ComponentFixture, TestBed } from '@angular/core/testing';
import { faker } from '@faker-js/faker';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { CoffeListComponent } from './coffe-list.component';
import { environment } from '../../../environments/environment';
import { Coffe } from '../../coffe';

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

  it('should render a table with a header and three coffee rows', () => {
    const tipos = ['Blend', 'Café de Origen'];
    const mockCoffees: Coffe[] = Array.from({ length: 3 }, (_, i) =>
      new Coffe(
        i + 1,
        `Café Especial ${faker.person.firstName()}`,
        faker.helpers.arrayElement(tipos),
        `${faker.location.city()}, ${faker.location.state()}`,
        faker.word.words(2),
        faker.number.int({ min: 1200, max: 2200 }),
        faker.image.url(),
      ),
    );
    httpMock.expectOne(environment.coffeeDataUrl).flush(mockCoffees);
    fixture.detectChanges();

    const table = (fixture.nativeElement as HTMLElement).querySelector('table')!;
    expect(table).toBeTruthy();

    const headerRows = table.querySelectorAll('thead tr');
    const bodyRows = table.querySelectorAll('tbody tr');
    expect(headerRows.length).toBe(1);
    expect(bodyRows.length).toBe(3);
    expect(table.querySelectorAll('tr').length).toBe(4);

    const headers = Array.from(headerRows[0].querySelectorAll('th')).map((th) => th.textContent?.trim());
    expect(headers).toEqual(['#', 'Nombre', 'Tipo', 'Región']);

    bodyRows.forEach((row, i) => {
      const cells = Array.from(row.querySelectorAll('th, td')).map((c) => c.textContent?.trim());
      const coffe = mockCoffees[i];
      expect(cells).toEqual([String(coffe.id), coffe.nombre, coffe.tipo, coffe.region]);
    });

    const expectedOrigen = mockCoffees.filter((c) => c.tipo === 'Café de Origen').length;
    expect(component.totalOrigen()).toBe(expectedOrigen);
    expect(component.totalBlend()).toBe(mockCoffees.length - expectedOrigen);
  });
});
