import { Component, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UxTipComponent } from '../uxtip/uxtip.component';

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
	email!: string;
	password!: string;

	constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) { }

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
		const email = this?.loginForm?.get('email')?.value;
		const password = this?.loginForm?.get('password')?.value;
		if (this.loginForm.invalid) {
			this.error = true;
			this.success = false;
			console.log(this.email, this.password);
			return;
		}

		this.authService.login(email, password).subscribe(
			() => {
				this.authService.loggedIn = true;
				this.error = false;
				this.success = true;
				setTimeout(() => {
					this.router.navigate(['home']);
				}, 2500);
			},
			(err) => {
				this.errorMessage = 'Invalid login information';
				this.error = true;
				this.success = false;
			}
		);
	};
}
