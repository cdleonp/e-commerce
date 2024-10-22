import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[highlight]',
  standalone: true
})
export class HighlightDirective {
  element = inject(ElementRef);

  constructor() { }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('green');
  }
  
  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('');
  }
  
  private highlight(color: string) {
    this.element.nativeElement.style.color = color;
  }


}
