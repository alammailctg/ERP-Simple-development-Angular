import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { JwtAuthService } from '../services/jwt-auth.service';
import { Router, RouterLink } from '@angular/router';
import { errorContext } from 'rxjs/internal/util/errorContext';
import { AssignrolesService } from '../services/assignroles.service';
import { HttpErrorResponse } from '@angular/common/http';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})


export class AdminComponent implements OnInit {
  currentUserName:string| null=null
  constructor(public authService:JwtAuthService, private router:Router, private assignRoleService:AssignrolesService){}
  ngOnInit(): void {
   this.checkIsAuthenticated();
   this.getUserName();
   
  }
  
private checkIsAuthenticated():void
{
if(this.authService.isAuthenticated())
{
  this.router.navigate(['/admin']);
}
else
{
  this.router.navigate(['login']);
}
}

logOut() {
  this.authService.logOut().subscribe({
    next:()=>{
      localStorage.removeItem('Bearer ');
      localStorage.removeItem('role');
      this.removeCookie('UserName');
      this.removeCookie('Token');
      this.removeCookie('.AspNetCore.Antiforgery.9rMqvOdYHPE');
      this.router.navigate(['/']);
    },
    error: () => {
      alert('Error fetching data from the server.');
    },
  });
}
removeCookie(name: string) {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

getUserName(): void {
  const token = localStorage.getItem("Bearer "); // Remove any extra spaces

  // Token validation
  if (!token) {
    console.error('Token is missing');
    return;
  }

  this.authService.getUserName(token).subscribe({
    next: (response) => {
      this.currentUserName=response;
      if (typeof response === 'string') {
        console.log("Data fetched successfully!", response); // Logs "admin"
      } else {
        console.error('Unexpected response format', response);
      }
    },
    error: (error) => {
      console.error('Error fetching data', error);
    },
  });
}

 
}