import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = this.fb.group({});

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email], { updateOn: 'blur' }],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    const fname = this?.registerForm?.get('fname')?.value;
    const lname = this?.registerForm?.get('lname')?.value;
    const email = this?.registerForm?.get('email')?.value;
    const password = this?.registerForm?.get('password')?.value;
    this.authService.register(fname, lname, email, password).subscribe(
      () => console.log("New user registered"),
      (err) => console.log(err),
      () => this.router.navigate(['login'])
    );
  }

}
