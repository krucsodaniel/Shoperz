import { ChangeDetectionStrategy, Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  IUser,
  passwordShouldMatchValidator,
  UniqueEmailValidatorService,
  UserFacadeService,
  EMAIL_REGEX,
  Route,
} from '@shared-module';
import { Router } from '@angular/router';

interface IRegisterForm {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  email: FormControl<string>;
  passwords: FormGroup<{
    password: FormControl<string>;
    confirmPassword: FormControl<string>;
  }>;
  termsAndConditions: FormControl<boolean>;
}

@Component({
  selector: 'app-register-panel',
  templateUrl: './register-panel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPanelComponent implements OnInit {
  registerForm: FormGroup<IRegisterForm>;

  @HostBinding('class')
  private readonly classes = 'border-2 rounded-md shadow-xl p-16';

  get firstNameControl(): FormControl<string> {
    return this.registerForm.controls.firstName;
  }

  get lastNameControl(): FormControl<string> {
    return this.registerForm.controls.lastName;
  }

  get emailControl(): FormControl<string> {
    return this.registerForm.controls.email;
  }

  get passwordControl(): FormControl<string> {
    return this.registerForm.controls.passwords.controls.password;
  }

  get confirmPasswordControl(): FormControl<string> {
    return this.registerForm.controls.passwords.controls.confirmPassword;
  }

  constructor(
    private fb: FormBuilder,
    private uniqueEmailValidatorService: UniqueEmailValidatorService,
    private userFacadeService: UserFacadeService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group<IRegisterForm>({
      firstName: this.fb.control(null, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
      lastName: this.fb.control(null, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
      email: this.fb.control(null,
        {
          validators: [Validators.required, Validators.pattern(EMAIL_REGEX)],
          asyncValidators: [this.uniqueEmailValidatorService.validate.bind(this.uniqueEmailValidatorService)],
          updateOn: 'blur',
        }),
      passwords: this.fb.group(
        {
          password: this.fb.control(null, [Validators.required, Validators.minLength(8)]),
          confirmPassword: this.fb.control(null),
        },
        {
          validators: [passwordShouldMatchValidator],
        },
      ),
      termsAndConditions: this.fb.control(null, [Validators.requiredTrue]),
    });
  }

  submitForm(): void {
    const { termsAndConditions, passwords: { confirmPassword, ...passwords }, ...user } = this.registerForm.value;

    const newUser = {
      ...user,
      password: passwords.password,
    };

    this.userFacadeService.registerUser(newUser as IUser);

    this.registerForm.reset();

    this.router.navigate([Route.login]);
  }

  navigateToLogin(): void {
    this.router.navigate([Route.login]);
  }

  buildTranslationKey(link: string, relativeKey: string): string {
    return `registrationPage.${ link }.${ relativeKey }`;
  }
}
