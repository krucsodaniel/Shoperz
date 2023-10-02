import {
  Component,
  OnInit,
  DestroyRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  HostBinding,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SearchFacadeService, ProductsManipulationService } from '../../services';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchbarComponent implements OnInit {
  readonly searchValue = new FormControl<string>('');

  @HostBinding('class')
  private readonly classes = 'flex justify-center items-center w-full relative';

  constructor(
    private productsManipulationService: ProductsManipulationService,
    private searchFacadeService: SearchFacadeService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private destroyRef: DestroyRef,
  ) {}

  ngOnInit(): void {
    this.searchFacadeService.getSearchValue()
      .pipe(
        filter((value: string) => value !== this.searchValue.value),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((value: string) => {
        this.searchValue.setValue(value);
        this.cdr.detectChanges();
      });

    this.searchValue.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(600),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((searchQuery: string) => {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { searchQuery: searchQuery || undefined },
          queryParamsHandling: 'merge',
        });
      });
  }

  deleteSearch(): void {
    this.searchValue.reset('');
  }
}
