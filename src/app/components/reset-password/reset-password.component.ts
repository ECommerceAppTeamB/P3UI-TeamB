import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { RouterModule } from '@angular/router';
import { compileNgModule } from '@angular/compiler';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})

export class ResetPasswordComponent implements OnInit {
  resetForm = new UntypedFormGroup({
    email: new UntypedFormControl(''),
    password: new UntypedFormControl('')
  });
  formSuccess:boolean = false;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.auth.resetPassword(this.resetForm.get('email')?.value, this.resetForm.get('password')?.value).subscribe(
      () => {
        this.formSuccess = true;
      },
      (err) => console.log(err)
    );
  }

}
