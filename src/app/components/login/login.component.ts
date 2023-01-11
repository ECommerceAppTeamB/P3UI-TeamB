import { Component, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UxTipComponent } from '../uxtip/uxtip.component';
import { tap } from 'rxjs/operators';
import { User } from '../../models/user';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UxTipComponent]
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.fb.group({});
  errorMessage = 'Please check required fields';
  successMessage = 'Successfully logged in';
  error = false;
  success = false;

  constructor(
    private localStore: LocalService,
    private authService: AuthService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email], { updateOn: 'blur' }],
      password: ['', Validators.required],
    });
  }

  fieldInvalid(formControl: AbstractControl) {
    return formControl.invalid && formControl.dirty;
  }

  onSubmit(): void {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    if (this.loginForm.invalid) {
      this.error = true;
      this.success = false;
      setTimeout(() => {
        this.error = false;
      }, 4000);
      return;
    }

    this.authService.login(email, password).subscribe(
      (response) => {
        this.error = false;
        this.success = true;
      },
      (err) => {
        console.log(err);
        this.errorMessage = 'Invalid login information';
        this.error = true;
        this.success = false;
        setTimeout(() => {
          this.error = false;
        }, 4000);
      }
    );
  }

}
