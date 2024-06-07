import { Component } from '@angular/core';
import { ValidationContainerDirective } from '../validation-container.directive';
import { ValidationSummaryComponent } from '../validation-summary/validation-summary.component';
import { ValidationErrors, validationErrros } from '../data';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; 
import { ValidationFormFieldComponent } from '../validation-form-field/validation-form-field.component';

@Component({
  selector: 'app-first-form',
  standalone: true,
  imports: [ValidationSummaryComponent, ValidationContainerDirective, MatButtonModule, MatFormFieldModule, MatInputModule, ValidationFormFieldComponent],
  template: `
    
      <div class="flex-column" style="display: flex; gap:1rem" [appValidationContainer]="validationErrors">
        <h1>a form</h1>

        <app-validation-summary />

        <app-validation-form-field  propertyName="LastName">
          <mat-form-field>
            <mat-label>Lastname</mat-label>
            <input matInput placeholder="LastName">
          </mat-form-field>
        </app-validation-form-field>

        <app-validation-form-field  propertyName="FirstName">
          <mat-form-field>
            <mat-label>Firstname</mat-label>
            <input matInput placeholder="Firstname">
          </mat-form-field>
        </app-validation-form-field>
        
        <app-validation-form-field  [propertyName]="['Country', 'ZipCode']">
        <div class="flex">
          <mat-form-field>
            <mat-label>Country</mat-label>
            <input matInput placeholder="Country" >
          </mat-form-field>

          <mat-form-field>
            <mat-label>Zip code</mat-label>
            <input matInput placeholder="Zip code">
          </mat-form-field> 
        </div>
        </app-validation-form-field>

        <div class="flex">
          <button mat-raised-button color="warn" (click)="validate()">Show the errors</button>
          <button mat-raised-button (click)="clear()">Clean the errors</button>
        </div>
      </div>

  `,
  styles: ``
})
export class FirstFormComponent {

  public validationErrors: ValidationErrors | undefined;


  public validate() { 
      this.validationErrors = { ...validationErrros }; 
  }

  public clear() {
    this.validationErrors = undefined;
  }

}
