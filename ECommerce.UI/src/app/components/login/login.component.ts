import { Component, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
	currUser!: User;

	constructor(
		private localStore: LocalService,
		private authService: AuthService,
		private router: Router,
		private fb: FormBuilder
	) {}

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

		this.authService.login(email, password).pipe(
			tap(response => this.currUser = new User(response.userId, response.firstName, response.lastName, response.email, response.password))
		).subscribe(
			(response) => {
				console.log(response.user);
				this.authService.loggedIn = true;
				this.error = false;
				this.success = true;
				this.localStore.saveData('currUser', JSON.stringify(this.currUser));
				setTimeout(() => {
					this.router.navigate(['home']);
				}, 2500);
			},
			(err) => {
				console.log(email, password);
				console.log(err);
				this.errorMessage = 'Invalid login information';
				this.error = true;
				this.success = false;
				setTimeout(() => {
					this.error = false;
					this.errorMessage = '';
				}, 4000);
			}
		);
	}
}
