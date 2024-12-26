import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';

@Component({
  selector: 'app-license-management',
  templateUrl: './license-management.component.html',
  styleUrls: ['./license-management.component.css'],
})
export class LicenseManagementComponent {
  generateForm: FormGroup;
  validateForm: FormGroup;
  generatedLicense: string | null = null;
  validationResult: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.generateForm = this.fb.group({
      clientName: ['', Validators.required],
      startDate: ['', Validators.required],
      expiryDate: ['', Validators.required],
      secretKey: ['', Validators.required],
    });

    this.validateForm = this.fb.group({
      licenseKey: ['', Validators.required],
      secretKey: ['', Validators.required],
    });
  }
  onGenerateLicense(): void {
    const payload = this.generateForm.value;
  
    this.http.post<{ LicenseKey: string }>("${environment.apiUrl}/GenerateLicense/generate", payload).subscribe({
      next: (response) => {
        this.generatedLicense = response.LicenseKey;
      },
      error: (error) => {
        console.error('Error generating license:', error);
        alert('Failed to generate license');
      },
      complete: () => {
        console.log('License generation completed');
      }
    });
  }
  
  onValidateLicense(): void {
    const payload = this.validateForm.value;
  
    this.http
      .post<{ Message: string; ClientName?: string; StartDate?: string; ExpiryDate?: string }>(
       `${environment.apiUrl}/license/validate`,
        payload
      )
      .subscribe({
        next: (response) => {
          this.validationResult = `Message: ${response.Message}, ClientName: ${response.ClientName || 'N/A'}, 
          StartDate: ${response.StartDate || 'N/A'}, ExpiryDate: ${response.ExpiryDate || 'N/A'}`;
        },
        error: (error) => {
          console.error('Error validating license:', error);
          this.validationResult = 'Invalid or expired license key';
        },
      });
  }
}
