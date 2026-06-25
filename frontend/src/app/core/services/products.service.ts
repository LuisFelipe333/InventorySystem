import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = `${environment.apiUrl}/products`;

  getProducts() {
    return this.http.get<Product[]>(this.apiUrl);
  }

  createProduct(product: Partial<Product>) {
    return this.http.post(this.apiUrl, product);
  }

  updateProduct(id: string, product: Partial<Product>) {

    return this.http.put(
      `${this.apiUrl}/${id}`,
      product
    );

  }

  deleteProduct(id: string) {

    return this.http.delete(
      `${this.apiUrl}/${id}`
    );

  }

}