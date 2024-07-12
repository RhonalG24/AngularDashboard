import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, signal } from '@angular/core';
import { ProductCardComponent } from './ui/product-card/product-card.component';
import { Product } from '@interfaces/product.interface';
import { interval, take, tap } from 'rxjs';

@Component({
  selector: 'app-input-outputs',
  standalone: true,
  imports: [
    CommonModule,
    ProductCardComponent
  ],
  templateUrl: './input-outputs.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class InputOutputsComponent implements OnDestroy{

  public products = signal<Product[]>([
    {
      id: 1,
      name: 'Product 1',
      quantity: 0,
    },
    {
      id: 2,
      name: 'Product 2',
      quantity: 0,
    },
  ])

  private intervalSubscription = interval(1000).pipe(
    tap( () => {
      this.products.update( products => [
        ...products,
        {
          id: products.length + 1,
          name : `Product ${products.length + 1}`,
          quantity: 0,
        },
      ]);
    }),
    take(7),
  ).subscribe();

  ngOnDestroy(): void {
    this.intervalSubscription.unsubscribe();
  }

  updateProduct(product: Product, quantity: number):void {
    this.products.update( (products) =>
      products.map( (p) => p.id === product.id ? { ...p, quantity } : p)
    )
  }
 }
