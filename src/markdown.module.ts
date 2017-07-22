import { NgModule } from '@angular/core';
import { MarkdownDirective } from './markdown.directive';

@NgModule({
  declarations: [
    MarkdownDirective
  ],
  exports: [
    MarkdownDirective
  ]
})
export class MarkdownModule { }
