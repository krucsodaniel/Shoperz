import { ChangeDetectionStrategy, Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  EMAIL_REGEX,
  ExistingEmailValidatorService,
  ILogin,
  Route,
  UserFacadeService,
} from '@shared-module';
import { Router } from '@angular/router';

interface ILoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login-panel',
  templateUrl: './login-panel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPanelComponent implements OnInit {
  loginForm: FormGroup<ILoginForm>;

  @HostBinding('class')
  private readonly classes = 'border-2 rounded-md shadow-xl p-16';

  get emailControl(): FormControl<string> {
    return this.loginForm.controls.email;
  }

  get passwordControl(): FormControl<string> {
    return this.loginForm.controls.password;
  }

  get isDisabled(): boolean {
    return this.loginForm.invalid || this.loginForm.pending;
  }

  constructor(
    private fb: FormBuilder,
    private userFacadeService: UserFacadeService,
    private existingEmailValidatorService: ExistingEmailValidatorService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
        email: this.fb.control(null,
          {
            validators: [Validators.required, Validators.pattern(EMAIL_REGEX)],
            asyncValidators: [this.existingEmailValidatorService.validate.bind(this.existingEmailValidatorService)],
            updateOn: 'blur',
          }),
        password: this.fb.control(null, [Validators.required, Validators.minLength(8)]),
    });
  }

  submitForm():void {
    if (this.isDisabled) {
      return;
    }

    const credentials = this.loginForm.value;

    this.userFacadeService.loginUser(credentials as ILogin);

    this.loginForm.reset();

    this.router.navigate([Route.home]);
  }

  navigateToRegister(): void {
    this.router.navigate([Route.register]);
  }

  buildTranslationKey(link: string, relativeKey: string): string {
    return `loginPage.${ link }.${ relativeKey }`;
  }
}
