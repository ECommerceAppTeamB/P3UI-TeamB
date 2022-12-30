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
		this.email = this?.loginForm?.get('email')?.value;
		this.password = this?.loginForm?.get('password')?.value;
	}

	fieldInvalid(formControl: AbstractControl) {
		return formControl.invalid && formControl.dirty;
	}

	onSubmit(): void {
		if (this.loginForm.invalid) {
			this.error = true;
			this.success = false;
			return;
		}
		// ! Remove when API methods are done
		else {
			this.error = false;
			this.success = true;
			setTimeout(() => {
				this.router.navigate(['home']);
			}, 2000);
		}

		//   ! Uncomment once API methods are done
		// this.authService.login(this.email, this.password).subscribe(
		// 	() => {
		// 		this.authService.loggedIn = true;
		// 		this.error = false;
		// 		this.success = true;
		// setTimeout(() => {
		// 	this.router.navigate(['home']);
		// }, 2000);
		// 	},
		// 	(err) => {
		// 		this.errorMessage = 'Invalid login information';
		// 		this.error = true;
		// 		this.success = false;
		// 	}
		// );
	};
}
