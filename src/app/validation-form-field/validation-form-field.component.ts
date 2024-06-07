import { Component, DestroyRef, Input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ValidationError } from '../data'; 
import { ValidationFieldHandlerService, ValidationFieldOptions } from '../validation-handler.service';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-validation-form-field',
  standalone: true,
  imports: [CommonModule],
  providers: [ValidationFieldHandlerService], 
  template: `
  <div [class.error]="errors" [@fade]="errors">
    <ng-content></ng-content>
    <ng-container *ngIf="errors && options.displayErrorsInFieldComponent">
    @for (error of errors; track error.property) {
      <div>{{error.property}} - {{error.error}}</div>
    }
    </ng-container>
   
  </div>
  `
})
export class ValidationFormFieldComponent {
  @Input({ required: true }) propertyName!: String | String[];

  public errors: ValidationError[] | undefined = undefined;
  public options: ValidationFieldOptions;

  constructor(private validationFieldHandler: ValidationFieldHandlerService, private destroyedRef: DestroyRef) {
    // this feels wrong atm
    this.options = validationFieldHandler.validationFieldOptions;
  }

  ngOnInit(): void {
    if (this.isStringArray(this.propertyName)) {
      this.validationFieldHandler.registerFields(...this.propertyName)
    } else {
      this.validationFieldHandler.registerFields(this.propertyName)
    }

    this.validationFieldHandler.observeValidationErrors().pipe(takeUntilDestroyed(this.destroyedRef)).subscribe(errors => {
      this.errors = errors;
    })
  }

  private isStringArray(value: String[] | String): value is String[] {
    return Array.isArray(value);
  }
}
