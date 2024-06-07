import { FirstFormComponent } from './first-form/first-form.component';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FirstFormComponent],
  template: `
    <h1>Welcome to {{title}}!</h1> 
    <div class="flex" style="padding: 2rem;">
      <app-first-form />
      <app-first-form />
      <app-first-form />
    </div>
  `,
  styles: [],
})
export class AppComponent {
  title = 'validationConcept';
}
