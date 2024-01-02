import { ChangeDetectionStrategy, Component, HostBinding, OnInit } from '@angular/core';
import { ProductFacadeService } from '@shared-module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  @HostBinding('class')
  private readonly classes = 'flex justify-center m-auto py-16 gap-8';

  constructor(private productFacadeService: ProductFacadeService) {}

  async ngOnInit(): Promise<void> {
    await this.productFacadeService.initLoginPage();
  }
}
