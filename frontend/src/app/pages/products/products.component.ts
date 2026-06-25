import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import * as bootstrap from 'bootstrap';

import { Product } from '../../models/product.model';
import { ProductsService } from '../../core/services/products.service';


@Component({
  selector: 'app-products',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  private readonly productsService = inject(ProductsService);

  private readonly fb = inject(FormBuilder);

  products: Product[] = [];

  selectedProduct?: Product;

  isEditMode = false;

  editingProductId: string | null = null;

  productForm = this.fb.group({

    name: ['', Validators.required],

    brand: ['', Validators.required],

    price: [0, Validators.required]

  });

  ngOnInit(): void {

    this.loadProducts();

  }

  loadProducts(): void {

    this.productsService.getProducts().subscribe({

      next: (products) => {

        console.log(products);

        this.products = products;

      },

      error: console.error

    });

  }

  openCreateModal(): void { // Abre el modal para crear un nuevo producto

    this.isEditMode = false;

    this.editingProductId = null;

    this.productForm.reset({

      name: '',

      brand: '',

      price: 0

    });

    const modalElement = document.getElementById('productFormModal');

    if (modalElement) {

        new bootstrap.Modal(modalElement).show();

    }

  }

  viewProduct(product: Product): void { // Muestra los detalles del producto seleccionado

    this.selectedProduct = product;

    const modalElement = document.getElementById('productDetailModal');

    if (modalElement) {

        new bootstrap.Modal(modalElement).show();

    }

  }

  editProduct(product: Product): void {

    this.isEditMode = true;

    this.editingProductId = product.id;

    this.productForm.patchValue({

        name: product.name,

        brand: product.brand,

        price: product.price

    });

    const modalElement = document.getElementById('productFormModal');

    if (modalElement) {

        new bootstrap.Modal(modalElement).show();

    }

  }

  deleteProduct(product: Product): void {

    if (!confirm(`¿Eliminar el producto ${product.name}?`)) {

        return;

    }

    this.productsService.deleteProduct(product.id).subscribe({

        next: () => {

            alert('Producto eliminado correctamente.');

            this.loadProducts();

        },

        error: (error) => {

            console.error(error);

            alert('Ocurrió un error al eliminar el producto.');

        }

    });

  }

  saveProduct(): void {

    if (this.isEditMode) {

        this.updateProduct();

    } else {

        this.createProduct();

    }

  }

  private createProduct(): void {

    if (this.productForm.invalid) {

        alert('Completa los campos requeridos.');

        return;

  }

  const product: Partial<Product> = {

      name: this.productForm.value.name ?? '',

      brand: this.productForm.value.brand ?? '',

      price: this.productForm.value.price ?? 0

  };

  this.productsService.createProduct(product).subscribe({

        next: () => {

            alert('Producto creado correctamente.');

            this.loadProducts();

            bootstrap
                .Modal
                .getInstance(
                    document.getElementById('productFormModal')!
                )
                ?.hide();

        },

        error: (error) => {

            console.error(error);

            alert('Ocurrió un error al crear el producto.');

        }

    });

  }

  private updateProduct(): void {

    if (this.productForm.invalid) {

        alert('Completa los campos requeridos.');

        return;

    }

    const product: Partial<Product> = {

      name: this.productForm.value.name ?? '',

      brand: this.productForm.value.brand ?? '',

      price: this.productForm.value.price ?? 0

  };

  this.productsService
      .updateProduct(
          this.editingProductId!,
          product
      )
      .subscribe({

            next: () => {

                alert('Producto actualizado correctamente.');

                this.loadProducts();

                bootstrap
                    .Modal
                    .getInstance(
                        document.getElementById('productFormModal')!
                    )
                    ?.hide();

            },

            error: (error) => {

                console.error(error);

                alert('Ocurrió un error al actualizar el producto.');

            }

        });

  }

}