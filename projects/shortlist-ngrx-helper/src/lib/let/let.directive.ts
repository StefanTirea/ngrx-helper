import {Directive, Input, OnChanges, SimpleChange, SimpleChanges, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[ngLet]'
})
export class LetDirective<T> implements OnChanges {

  @Input()
  ngLet?: T;

  private context: LetContext<T> = {$implicit: null};

  constructor(_viewContainer: ViewContainerRef,
              _templateRef: TemplateRef<LetContext<T>>) {
    _viewContainer.createEmbeddedView(_templateRef, this.context);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const change: SimpleChange = changes['ngLet'];
    if (change?.previousValue !== change?.currentValue) {
      this.context.$implicit = change.currentValue;
    }
  }
}

interface LetContext<T> {
  $implicit: T | null;
}
