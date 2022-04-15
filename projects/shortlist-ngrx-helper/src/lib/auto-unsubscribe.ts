import {Directive, OnDestroy} from "@angular/core";
import {takeUntil} from "rxjs/operators";
import {Observable, Subject} from "rxjs";

// using Directive to avoid "Class is using Angular features but is not decorated. Please add an explicit Angular decorator"
@Directive()
export abstract class AutoUnsubscribe implements OnDestroy {

  private $unsubscribeNotifier = new Subject<void>();

  ngOnDestroy(): void {
    this.$unsubscribeNotifier.next();
    this.$unsubscribeNotifier.complete();
  }

  autoUnsubscribe<T>(observable$: Observable<T>): Observable<T> {
    return observable$?.pipe(takeUntil(this.$unsubscribeNotifier));
  }
}
