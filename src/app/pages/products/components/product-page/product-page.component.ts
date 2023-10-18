import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnInit,
  ChangeDetectorRef,
  DestroyRef,
} from '@angular/core';
import { Observable } from 'rxjs';
import { CartFacadeService, ICalculatedProduct, ProductFacadeService } from '@shared-module';
import { ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductPageComponent implements OnInit {
  product$: Observable<ICalculatedProduct>;
  selectedPicture: string;
  numberFormControl: FormControl<number>;
  amountOfProductInCart: number;
  readonly typeOfPage = 'product-page';

  @HostBinding('class')
  private readonly classes = 'flex flex-col md:flex-row flex-wrap justify-center md:justify-around gap-5 mx-auto pt-10 pb-5 mt-4';
  private productId: string;

  constructor(
    private productFacadeService: ProductFacadeService,
    private cartFacadeService: CartFacadeService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private destroyRef: DestroyRef,
  ) {}

  async ngOnInit(): Promise<void> {
    this.numberFormControl = new FormControl(1, [Validators.required]);

    this.amountOfProductInCart = this.numberFormControl.value;

    this.numberFormControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((amount: number) => this.amountOfProductInCart = +amount);

    this.productId = this.route.snapshot.paramMap.get('id');

    await this.productFacadeService.initSpecificProductPage(this.productId);

    this.product$ = this.productFacadeService.getSingleProduct(this.productId);

    this.cdr.detectChanges();
  }

  choosePicture(productPicture: string): void {
    this.selectedPicture = productPicture;
  }

  incrementQuantity(): void {
    const currentValue = +this.numberFormControl.value;

    if (currentValue < 10) {
      this.numberFormControl.setValue(currentValue + 1);
    }
  }

  decrementQuantity(): void {
    const currentValue = +this.numberFormControl.value;

    if (currentValue >= 2) {
      this.numberFormControl.setValue(currentValue - 1);
    }
  }

  setFormCurrentValue(amount: number): void {
    this.numberFormControl.setValue(amount);
  }

  buildTranslationKey(relativeKey: string): string {
    return `cart.${ relativeKey }`;
  }
}
