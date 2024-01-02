import { ChangeDetectionStrategy, Component, HostBinding, OnInit } from '@angular/core';
import { ProductFacadeService } from '@shared-module';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent implements OnInit {
  @HostBinding('class')
  private readonly classes = 'flex justify-center m-auto py-16 gap-8';

  constructor(private productsFacadeService: ProductFacadeService) {}

  async ngOnInit(): Promise<void> {
    await this.productsFacadeService.initRegisterPage();
  }
}
