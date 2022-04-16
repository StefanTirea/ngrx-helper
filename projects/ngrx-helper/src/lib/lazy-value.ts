import {HttpErrorResponse} from '@angular/common/http';

export class LazyValue<T> {

  constructor(public value: T | undefined,
              public isLoading: boolean,
              public error: HttpErrorResponse | undefined) {
  }

  public static just<T>(value: T): LazyValue<T> {
    return new LazyValue(value, false, undefined);
  }

  public static loading<T>(): LazyValue<T> {
    return new LazyValue<T>(undefined, true, undefined);
  }

  public static error<T>(httpError: HttpErrorResponse): LazyValue<T> {
    return new LazyValue<T>(undefined, false, httpError);
  }

  public map(fn: (value: T) => any): any | undefined {
    return this.value ? fn(this.value) : undefined;
  }
}
