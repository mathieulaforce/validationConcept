import { Injectable } from '@angular/core';
import { ValidationError, ValidationErrors } from './data';
import { BehaviorSubject } from 'rxjs';
 
export interface ValidationSummaryHandler {
  setErrors(validationErrors: ValidationErrors | undefined): void;
}
export interface ValidationFieldHandler {
  addError(validationError: ValidationError): void;
  clearErrors():void;
}

  
@Injectable()
export class ValidationDirectorService {

  private validationSummary: ValidationSummaryHandler | undefined;
  private validationFields: Map<String, ValidationFieldHandler> = new Map();

  constructor() { }

  public registerValidationField(validationFieldHandler: ValidationFieldHandler, ...fieldNames: String[]): void {
    fieldNames.forEach(fieldName => {
      if (this.validationFields.has(fieldName)) {
        alert(`fieldname ${fieldName} is already beeing taken care of`);
        throw new Error();
      }
      this.validationFields.set(fieldName, validationFieldHandler)
    });
  }

  public registerValidationSummary(validationSummary: ValidationSummaryHandler) {
    if (this.validationSummary) {
      alert("only 1 validation summary allowed")
      throw new Error();
    }

    this.validationSummary = validationSummary;
  };

  public handleErrors(validationErrors: ValidationErrors | undefined) {
    this.clearErrors();
    if (validationErrors) { 
      this.publishErrors(validationErrors);
    } 
  }

  private clearErrors(){
    this.validationSummary?.setErrors(undefined);
    this.validationFields.forEach(field => field.clearErrors());
  }

  private publishErrors(validationErrors: ValidationErrors) {
    const summaryErrors: ValidationErrors = { errors: [] };
    validationErrors.errors.forEach(error => {
      const validationField = this.validationFields.get(error.property);
      if (validationField) {
        validationField.addError(error);
      } else {
        summaryErrors.errors.push(error);
      }
    });

    this.validationSummary?.setErrors(summaryErrors);
  }
}

@Injectable()
export class ValidationSummaryHandlerService implements ValidationSummaryHandler {

  private validationErrorSubject = new BehaviorSubject<ValidationErrors | undefined>(undefined);

  constructor(private validationDirector: ValidationDirectorService) {
    this.validationDirector.registerValidationSummary(this);    
  }

  observeValidationErrors() {
    return this.validationErrorSubject.asObservable();
  }

  setErrors(validationErrors: ValidationErrors | undefined): void {
    this.validationErrorSubject.next(validationErrors);
  }
}

@Injectable()
export class ValidationFieldHandlerService implements ValidationFieldHandler {

  private errorsSubject = new BehaviorSubject<ValidationError[]>([]);

  constructor(private validationDirector: ValidationDirectorService) {
  }

  clearErrors(): void {
    this.errorsSubject.next([]);
  }

  observeValidationErrors() {
    return this.errorsSubject.asObservable();
  }

  addError(validationError: ValidationError): void {
    if (this.errorsSubject.value) {
      this.errorsSubject.next([...this.errorsSubject.value, validationError]);
    } else {
      this.errorsSubject.next([validationError])
    }
  }

  registerFields(...fieldNames: String[]) {
    this.validationDirector.registerValidationField(this, ...fieldNames);
  }
}
