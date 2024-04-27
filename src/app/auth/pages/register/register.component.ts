import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthenService } from '../../../core/services/common/authen.service';
import { Router, RouterModule } from '@angular/router';
import { takeUntil } from 'rxjs';
import { DestroyAutoService } from '../../../core/services/utils/destroy-auto.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  //INJECTS
  private fb = inject(FormBuilder);
  public authService = inject(AuthenService);
  public destroy$ = inject(DestroyAutoService);
  public router = inject(Router);

  public incorrectUser = signal<boolean>(false);

  public myForm: FormGroup = this.fb.group(
    {
      username: ['Paco12', Validators.required],
      email: ['paco@gmail.com', [Validators.required, Validators.email]],
      password: [
        'ABC123a',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
        ],
      ],
      confirmPassword: [
        'ABC123a',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
        ],
      ],
    },
    {
      validators: [this.passwordMatchValidator],
    }
  );

  onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    const { username, email, password } = this.myForm.value;

    this.authService
      .register(username, email, password)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.incorrectUser.set(false);
          this.router.navigateByUrl('/');
        },

        error: (err) => {
          this.incorrectUser.set(true);
        },
      });
  }

  //METHODS
  getFieldError(field: string): string | null {
    if (!this.myForm.controls[field]) return '';

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Campo requerido';

        case 'minlength':
          return `Minimo ${errors['minlength'].requiredLength} caracteres`;

        case 'maxlength':
          return `Maximo ${errors['maxlength'].requiredLength} caracteres`;

        case 'email':
          return 'Email invalido';

        case 'pattern':
          return 'Password must contain at least one letter, one number and one capital letter';

        default:
          break;
      }
    }

    return null;
  }

  isValidField(field: string): boolean | undefined {
    const fieldControl = this.myForm.get(field);
    return fieldControl?.touched && fieldControl?.invalid;
  }

  passwordMatchValidator(form: AbstractControl) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }
}
