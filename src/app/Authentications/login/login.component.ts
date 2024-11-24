import { Component } from '@angular/core';
import { JwtAuthService } from '../../services/jwt-auth.service';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private jwtAuthService: JwtAuthService, private router: Router) {}

  handleLogin() {

    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter a valid email and password.';
      return;
    }
    this.isLoading = true;
    this.errorMessage = '';

    // Simulate login process (replace with actual login logic)
    setTimeout(() => {
      this.isLoading = false;
      // Perform login logic here
    }, 1500);

    
    this.jwtAuthService.UserLogin(this.username, this.password).pipe(
      tap({
        next: response => {
          if (response.includes('registared')) {
            this.errorMessage = response;
          } else {
            localStorage.setItem('Bearer ', response);
            this.fetchUserRole(response);
          }
        },
        error: () => this.errorMessage = 'Login failed. Please try again.',
      }),
      catchError(() => {
        this.errorMessage = 'An error occurred. Please try again later.';
        return of(null);
      }),
      tap(() => this.isLoading = false) // Ensure isLoading is set to false after processing
    ).subscribe();
  }
  
  private fetchUserRole(token: string) {
    this.jwtAuthService.getRoleFromClaim(token).pipe(
      tap({
        next: role => {
          localStorage.setItem('role', role);
          this.router.navigate(['/admin']);
        },
        error: () => console.error('Error calling GetTokenFromClaim'),
      }),
      catchError(() => {
        console.error('GetRoleFromClaim error');
        return of(null);
      })
    ).subscribe();
  }
}
