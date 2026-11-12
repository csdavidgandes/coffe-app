import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { faker } from '@faker-js/faker';

import { CoffeService } from './coffe.service';
import { Coffe } from '../coffe';
import { environment } from '../../environments/environment';

describe('CoffeService', () => {
  let service: CoffeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoffeService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(CoffeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the list of coffees from the API', () => {
    const mockCoffeList: Coffe[] = Array.from({ length: 2 }, (_, i) =>
      new Coffe(
        i + 1,
        `Café Especial ${faker.person.firstName()}`,
        faker.helpers.arrayElement(['Blend', 'Café de Origen']),
        `${faker.location.city()}, ${faker.location.state()}`,
        faker.word.words(2),
        faker.number.int({ min: 1200, max: 2200 }),
        faker.image.url(),
      ),
    );

    let result: Coffe[] | undefined;
    service.getCoffeList().subscribe((coffeList) => (result = coffeList));

    const req = httpMock.expectOne(environment.coffeeDataUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockCoffeList);

    expect(result).toEqual(mockCoffeList);
  });
});
