import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchService } from '../../services';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {
  readonly searchValue = new FormControl<string>('');

  private readonly destroyRef = inject(DestroyRef);

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.searchValue.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value: string) => this.searchService.setSearchValue(value));
  }

  deleteSearch(): void {
    this.searchService.setSearchValue('');
    this.searchValue.reset();
  }
}
