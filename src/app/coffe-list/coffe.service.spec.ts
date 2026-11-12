/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { CoffeService } from './coffe.service';
import { HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('Service: Coffe', () => {

  let service: CoffeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoffeService, provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(CoffeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });
  
  it('should ...', inject([CoffeService], (service: CoffeService) => {
    expect(service).toBeTruthy();
  }));

  it('should return a list of coffee', () => {
    const mockCoffeList = [
      { id: 1, nombre: 'Café de Colombia', tipo: 'Arábica', region: 'Colombia', sabor: 'Dulce y afrutado', altura: 1500, imagen: 'https://example.com/colombia.jpg' },
      { id: 2, nombre: 'Café de Brasil', tipo: 'Robusta', region: 'Brasil', sabor: 'Fuerte y amargo', altura: 800, imagen: 'https://example.com/brasil.jpg' }
    ];

    service.getCoffeList().subscribe(coffeList => {
      expect(coffeList.length).toBe(2);
      expect(coffeList).toEqual(mockCoffeList);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(mockCoffeList);
  });

});
