import { Component, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UxTipComponent } from '../uxtip/uxtip.component';
import { User } from '../../models/user';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UxTipComponent]
})

export class RegisterComponent implements OnInit {
  registerForm: FormGroup = this.fb.group({});
  errorMessage = 'Please check required fields';
  successMessage = 'Registration successful, logging in...';
  error = false;
  success = false;
  currUser!: User;

  constructor(
    private localStore: LocalService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      fname: ['', [Validators.required, Validators.minLength(1)], { updateOn: 'blur' }],
      lname: ['', [Validators.required, Validators.minLength(1)], { updateOn: 'blur' }],
      email: ['', [Validators.required, Validators.email], { updateOn: 'blur' }],
      password: ['', [Validators.required, Validators.minLength(5)], { updateOn: 'blur' }],
    });
  }

  fieldInvalid(formControl: AbstractControl) {
    return formControl.invalid && formControl.dirty;
  }

  onSubmit(): void {
    const fname = this.registerForm?.get('fname')?.value;
    const lname = this.registerForm?.get('lname')?.value;
    const email = this.registerForm?.get('email')?.value;
    const password = this.registerForm?.get('password')?.value;

    if (this.registerForm.invalid) {
      this.error = true;
      this.success = false;
      setTimeout(() => {
        this.error = false;
      }, 4000);
      return;
    }

    this.authService.register(fname, lname, email, password).subscribe(
      (response) => {
        this.currUser = new User(response.id, response.firstName, response.lastName, response.email);
        this.error = false;
        this.success = true;
        setTimeout(() => {
          this.router.navigate(['home']);
        }, 2500);
      },
      (err) => {
        console.log(err);
        this.errorMessage = 'Email already in use';
        this.error = true;
        this.success = false;
        setTimeout(() => {
          this.error = false;
        }, 4000);
      }
    );
  }
}
