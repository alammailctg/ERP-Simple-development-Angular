
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { AssignrolesService } from '../services/assignroles.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-asignroles',
  templateUrl: './asignroles.component.html',
  styleUrl: './asignroles.component.css'
})
 
export class AsignrolesComponent implements OnInit {
   

  constructor(private assignRoleService: AssignrolesService,private router:Router) {}

  ngOnInit() {
    this.getAllUsers();
  }

   
users:any[]=[];

getAllUsers(): void {
  const token = localStorage.getItem("Bearer ");
  
  this.assignRoleService.getAllUsers(token).subscribe({
    next: (response: any) => {
      console.log(response); // Log the response data for debugging
      // Ensure response is an array
      this.users = Array.isArray(response) ? response : response.users || [];
    },
    error: (error: HttpErrorResponse) => { 
      console.error("Error in users", error);
    }
  });
}


selectedUserId: number = 0; 
onUserChange(): void {
  if (this.selectedUserId > 0) { // Ensures a valid selection
    this.getUserRoleByUserId(this.selectedUserId);
  }
}

allRoles = [
  { id: 1, name: 'Admin', isChecked: false },
  { id: 2, name: 'Manager', isChecked: false },
  { id: 3, name: 'User', isChecked: false },
  { id: 4, name: 'Sales', isChecked: false }
];


getUserRoleByUserId(userId:number): void {
  this.assignRoleService.getUserRoleByUserId(userId).subscribe({
    next: (response: any) => {
      console.log(response); // Log the response data for debugging
       
      this.allRoles.forEach(role => role.isChecked = false);

      // Update isChecked to true for roles that match the user's roles
      response.userRoles.forEach((item: any) => {
        const matchRole = this.allRoles.find(r => r.id === item.roleId);
        if (matchRole) {
          matchRole.isChecked = true;
          console.log(`Matched Role: ${JSON.stringify(matchRole)}`); // Log the matched role for confirmation
        }
      });
    },
    error: (error: HttpErrorResponse) => { 
      console.error("Error in users", error);
    }
  });
}


roleIds:any[] = [];
assignRoles(): void {

  this.roleIds = []; // Reset roleIds for the new user
  this.allRoles.forEach(role => {
    if (role.isChecked) {
      this.roleIds.push(role.id);
    }
  });

  
const assignRoleRequest = {
  UserId: this.selectedUserId,
  RoleIds: this.roleIds
};

  this.assignRoleService.assignRole(assignRoleRequest).subscribe({
    next: (response: any) => {
      console.log(`Selected Role IDs: ${JSON.stringify(this.roleIds)}`); // Log the selected role IDs for debugging
      localStorage.removeItem('Bearer ');
      localStorage.removeItem('role');
      this.removeCookie('UserName');
      this.removeCookie('Token');
      this.removeCookie('.AspNetCore.Antiforgery.9rMqvOdYHPE');
      this.router.navigate(['/']); // Redirect to the login page
    },
    error: (error: HttpErrorResponse) => {
      console.error("Error in users", error);
    }
  });
}
removeCookie(name: string) {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}


}




