import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ValidationDirectorService, ValidationSummaryHandlerService } from './validation-handler.service';
import { ValidationErrors } from './data';

@Directive({
  selector: '[appValidationContainer]',
  standalone: true,
  providers: [
    ValidationDirectorService,
    ValidationSummaryHandlerService,  
  ]
})
export class ValidationContainerDirective implements OnChanges {

  @Input({ alias: 'appValidationContainer', required: true }) validationErrors: ValidationErrors | undefined;

  constructor(private validationDirector: ValidationDirectorService) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['validationErrors']) {
      this.validationDirector.handleErrors(this.validationErrors);
    }
  }

}
