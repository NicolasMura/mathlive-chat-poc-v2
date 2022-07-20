import { AfterViewInit, Directive, ElementRef } from '@angular/core';


@Directive({
  selector: '[mlLibAutofocus]'
})
export class AutofocusDirective implements AfterViewInit {
  constructor(private host: ElementRef) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.host.nativeElement.focus();
    }, 100);
  }
}
