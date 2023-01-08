import { Component, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { RouterModule } from '@angular/router';
import { compileNgModule } from '@angular/compiler';
import { UxTipComponent } from '../uxtip/uxtip.component';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  providers: [UxTipComponent]
})

export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup = this.fb.group({});
  errorMessage = 'Please check required fields';
  successMessage = 'Password changed successfully';
  error = false;
  success = false;

  constructor(private auth: AuthService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email], { updateOn: 'blur' }],
      password: ['', Validators.required],
    });
  }

  fieldInvalid(formControl: AbstractControl) {
    return formControl.invalid && formControl.dirty;
  }

  onSubmit(): void {
    if (this.resetForm.invalid) {
      this.error = true;
      this.success = false;
      setTimeout(() => {
        this.error = false;
      }, 4000);
      return;
    }

    this.auth.resetPassword(this.resetForm.get('email')?.value, this.resetForm.get('password')?.value).subscribe(
      () => {
        this.success = true;
      },
      (err) => console.log(err)
    );
  }

}
