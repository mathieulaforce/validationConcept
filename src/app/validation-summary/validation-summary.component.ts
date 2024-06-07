import { ValidationSummaryHandlerService } from './../validation-handler.service';
import { Component, DestroyRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '../data';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-validation-summary',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="validationErrors !== undefined && validationErrors.errors.length > 0" class="error">
      <h2>ERROR</h2>
      <ul>
        @for (item of validationErrors.errors; track $index) {
          <li>{{item.property}} - {{item.error}}</li> 
        }
      </ul>
  </div>
  `,
  styles: ``
})
export class ValidationSummaryComponent implements OnInit  {

  public validationErrors: ValidationErrors | undefined;

  constructor(private validationSummaryHandler: ValidationSummaryHandlerService, private destroyedRef:DestroyRef){

  }

  ngOnInit(): void {
    this.validationSummaryHandler.observeValidationErrors().pipe(takeUntilDestroyed(this.destroyedRef)).subscribe(errors => this.validationErrors = errors)
  }

}
