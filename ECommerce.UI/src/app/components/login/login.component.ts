import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
	loginForm: FormGroup = this.fb.group({});

	constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {}

	ngOnInit() {
		this.loginForm = this.fb.group({
			email: ['', [Validators.required, Validators.email], { updateOn: 'blur' }],
			password: ['', Validators.required],
		});
	}

	onSubmit(): void {
		const email = this?.loginForm?.get('email')?.value;
		const password = this?.loginForm?.get('password')?.value;
		this.authService.login(email, password).subscribe(
			() => {this.authService.loggedIn = true;},
			(err) => console.log(err),
			() => this.router.navigate(['home'])
		);
	};

	register(): void {
		this.router.navigate(['register']);
	}
}
