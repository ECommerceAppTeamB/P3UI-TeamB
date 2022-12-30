import { Component, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UxTipComponent } from '../uxtip/uxtip.component';
import { ValidateService } from 'src/app/services/validate.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UxTipComponent]
})

export class RegisterComponent implements OnInit {
  registerForm: FormGroup = this.fb.group({});
  errorMessage = 'Please check required fields';
  successMessage = 'Successfully registered, please log in';
  error = false;
  success = false;
  fname!: string;
  lname!: string;
  email!: string;
  password!: string;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      fname: ['', Validators.required, { updateOn: 'blur' }],
      lname: ['', Validators.required, { updateOn: 'blur' }],
      email: ['', [Validators.required, Validators.email], { updateOn: 'blur' }],
      password: ['', Validators.required],
    });
    this.fname = this?.registerForm?.get('email')?.value;
    this.lname = this?.registerForm?.get('password')?.value;
    this.email = this?.registerForm?.get('email')?.value;
    this.password = this?.registerForm?.get('password')?.value;
  }

  fieldInvalid(formControl: AbstractControl) {
    return formControl.invalid && formControl.dirty;
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.error = true;
      this.success = false;
      return;
    }
    // ! Remove when API methods are done
    else {
      this.error = false;
      this.success = true;
      setTimeout(() => {
        this.router.navigate(['login']);
      }, 3000);
    }

    //   ! Uncomment once API methods are done
    //   this.authService.register(this.fname, this.lname, this.email, this.password).subscribe(
    //     () => {
    //       this.error = false;
    //       this.success = true;
    //       setTimeout(() => {
    //         this.router.navigate(['login']);
    //       }, 3000);
    //     },
    //     (err) => {
    //       this.errorMessage = 'User already exists';
    //       this.error = true;
    //       this.success = false;
    //     }
    //   );
    // }
  }
}
