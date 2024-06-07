import { DestroyRef, Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { ValidationFieldHandlerService } from './validation-handler.service';
import { ValidationError } from './data';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[appValidationFieldError]',
  standalone: true
})
export class ValidationFieldErrorDirective implements OnInit {
  constructor(private validationFieldHandler: ValidationFieldHandlerService,
    private destroyedRef: DestroyRef,
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) {
  }

  ngOnInit(): void {
    this.validationFieldHandler.observeValidationErrors()
      .pipe(takeUntilDestroyed(this.destroyedRef))
      .subscribe(errors => this.updateView(errors) );
      this.validationFieldHandler.preventDisplayInFieldComponent();
  }

  private updateView(errors: ValidationError[]) {
    this.viewContainer.clear();
    errors.forEach(error => {
      this.viewContainer.createEmbeddedView(this.templateRef, {
        $implicit: error
      });
    });
  }
}
