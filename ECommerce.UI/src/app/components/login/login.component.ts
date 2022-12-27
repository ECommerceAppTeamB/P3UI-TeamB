import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    UntypedFormControl,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    loginForm = new UntypedFormGroup({
        email: new UntypedFormControl('', [
            Validators.required,
            Validators.email,
        ]),
        password: new UntypedFormControl('', Validators.required),
    });

    constructor(
        private authService: AuthService,
        private router: Router,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {}

    onSubmit(): void {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        });
        this.authService
            .login(
                this.loginForm.get('email')?.value,
                this.loginForm.get('password')?.value
            )
            .subscribe(
                () => {
                    this.authService.loggedIn = true;
                },
                (err) => console.log(err),
                () => this.router.navigate(['home'])
            );
    }

    register(): void {
        this.router.navigate(['register']);
    }
}
