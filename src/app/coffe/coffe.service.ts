import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Coffe } from '../coffe';

@Injectable({
  providedIn: 'root'
})
export class CoffeService {

  private readonly apiUrl: string = environment.coffeeDataUrl;
  private readonly http = inject(HttpClient);

constructor() { }

  getCoffeList() {
    return this.http.get<Coffe[]>(this.apiUrl);
  }

}