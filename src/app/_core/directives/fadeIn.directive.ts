import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appFadeIn]',
})
export class FadeInDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const componentPosition = this.el.nativeElement.offsetTop;
    const scrollPosition = window.pageYOffset;

    if (scrollPosition >= componentPosition - 450) {
      this.renderer.addClass(this.el.nativeElement, 'fade-in');
    } else {
      this.renderer.setStyle(
        this.el.nativeElement,
        'transition',
        'opacity 0.3s, transform 0.3s'
      );
      this.renderer.removeClass(this.el.nativeElement, 'fade-in');
      setTimeout(() => {
        this.renderer.setStyle(this.el.nativeElement, 'transition', 'none');
      }, 300);
    }
  }
}
