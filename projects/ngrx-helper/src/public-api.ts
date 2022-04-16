/*
 * Public API Surface of ngrx-helper
 */

// ngrx helper methods
export {HttpActions, createHttpActions, createHttpReducer, createHttpEffect} from './lib/ngrx/ngrx-http-helper';
export {AppActions, createAppActions, createAppReducer} from './lib/ngrx/ngrx-app-helper';
export {
  RequestActionProps, ResponseActionProps, ErrorActionProps, combineFeatureReducers, createSelectorHelper
} from './lib/ngrx/ngrx-util';

// wrapper type for lazy state
export * from './lib/lazy-value';

// alternative directive to `*ngIf` without removing the view when falsy
export * from './lib/let/let.directive';
export * from './lib/let/let-directive.module';

// auto unsubscribe subscription on component destroy
export * from './lib/auto-unsubscribe';
