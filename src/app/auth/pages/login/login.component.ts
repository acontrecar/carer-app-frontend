import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { AuthenService } from '../../../core/services/common/authen.service';
import { DestroyAutoService } from '../../../core/services/utils/destroy-auto.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  //INJECTS
  private fb: FormBuilder = inject(FormBuilder);
  // private authService = inject(AuthService);
  private paco = inject(AuthenService);
  private autoDestroy$ = inject(DestroyAutoService);
  private router = inject(Router);

  public myForm: FormGroup = this.fb.group({
    email: ['antonio@google.com', [Validators.required, Validators.email]],
    password: ['Abc123', Validators.required],
  });

  public isCorrectUser = signal<boolean>(true);

  onSubmit(): void {
    if (this.myForm.invalid) return;

    const { email, password } = this.myForm.value;

    this.paco
      .login(email, password)
      .pipe(takeUntil(this.autoDestroy$))
      .subscribe({
        next: () => {
          this.isCorrectUser.set(true);
          this.router.navigate(['/carer']);
          // this.paco.prueba.set(true);
        },
        error: (error) => {
          this.isCorrectUser.set(false);
          // this.paco.prueba.set(true);
          // console.log(this.paco.prueba());
        },
      });
  }
}
