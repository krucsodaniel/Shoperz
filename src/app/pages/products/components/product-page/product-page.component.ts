import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { Observable } from 'rxjs';
import { CartFacadeService, ICalculatedProduct, ProductFacadeService } from '@shared-module';
import { ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductPageComponent implements OnInit {
  product$: Observable<ICalculatedProduct>;
  selectedPicture: string;
  numberFormControl: FormControl<number>;

  @HostBinding('class')
  private readonly classes = 'flex flex-col md:flex-row flex-wrap justify-center md:justify-around gap-5 mx-auto pt-10 pb-5 mt-4';
  private productId: string;

  constructor(
    private productFacadeService: ProductFacadeService,
    private cartFacadeService: CartFacadeService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.numberFormControl = new FormControl(1, [Validators.required]);

    this.productId = this.route.snapshot.paramMap.get('id');

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
