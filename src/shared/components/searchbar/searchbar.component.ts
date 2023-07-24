import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProductsManipulationService } from 'src/app/pages/products/services';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {
  readonly searchValue = new FormControl<string>('');

  private readonly destroyRef = inject(DestroyRef);

  constructor(private productsManipulationService: ProductsManipulationService) {}

  ngOnInit(): void {
    this.searchValue.valueChanges
      .pipe(
        debounceTime(600),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((value: string) => this.productsManipulationService.setSearchValue(value));
  }

  deleteSearch(): void {
    this.searchValue.reset('');
  }
}
