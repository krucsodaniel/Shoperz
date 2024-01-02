import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormControlStatus, FormGroup, Validators } from '@angular/forms';
import {
  EMAIL_REGEX,
  ExistingEmailValidatorService,
  ILogin,
  Route,
  UserFacadeService,
} from '@shared-module';
import { bufferCount, filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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

  constructor(
    private fb: FormBuilder,
    private userFacadeService: UserFacadeService,
    private existingEmailValidatorService: ExistingEmailValidatorService,
    private cdr: ChangeDetectorRef,
    private destroyRef: DestroyRef,
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

    this.loginForm.statusChanges
      .pipe(
        bufferCount(2, 1),
        filter(([prevState]: FormControlStatus[]) => prevState === 'PENDING'),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => this.cdr.markForCheck());
  }

  submitForm():void {
    const credentials = this.loginForm.value;

    this.userFacadeService.loginUser(credentials as ILogin);

    this.loginForm.reset();

    this.router.navigate([Route.products]);
  }

  navigateToRegister(): void {
    this.router.navigate([Route.register]);
  }

  buildTranslationKeyForForm(label: string): string {
    return `loginPage.form.${ label }`;
  }

  buildTranslationKeyForPlaceholders(placeholder: string): string {
    return `loginPage.placeholders.${ placeholder }`;
  }

  buildTranslationKeyForMessages(message: string): string {
    return `loginPage.messages.${ message }`;
  }
}
