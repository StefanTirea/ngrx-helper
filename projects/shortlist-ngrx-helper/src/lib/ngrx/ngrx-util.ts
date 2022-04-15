import {HttpErrorResponse} from '@angular/common/http';
import {LazyValue} from '../lazy-value';
import {Action, ActionCreator, ActionReducer, createFeatureSelector, createSelector} from '@ngrx/store';
import {TypedAction} from "@ngrx/store/src/models";

export interface RequestActionProps<REQ> {
  payload?: REQ;
}

export interface ResponseActionProps<REQ, RES> {
  payload: RES | null;
  requestPayload?: REQ;
}

export interface ErrorActionProps<REQ> {
  requestPayload?: REQ;
  httpStatus?: number;
  httpError?: HttpErrorResponse;
}

// Custom Action types for autocomplete when dispatching actions => See ngrx createAction(...) return type
export type RequestAction<REQ> = RequestActionProps<REQ> & TypedAction<string>;
export type ResponseAction<REQ, RES> = ResponseActionProps<REQ, RES> & TypedAction<string>;
export type ErrorAction<REQ> = ErrorActionProps<REQ> & TypedAction<string>;

// Custom ActionCreator combines empty ActionCreator with Payload Type
export type RequestActionCreator<REQ> = ActionCreator<string, (props: RequestActionProps<REQ>) => RequestAction<REQ>>;
export type ResponseActionCreator<REQ, RES> = ActionCreator<string, (props: ResponseActionProps<REQ, RES>) => ResponseAction<REQ, RES>>;
export type ErrorActionCreator<REQ> = ActionCreator<string, (props: ErrorActionProps<REQ>) => ErrorAction<REQ>>;
export type ResetActionCreator = ActionCreator<string, () => TypedAction<string>>;

export const createNewState = <S, K extends keyof S>(state: S, fieldName: K, value: LazyValue<S[K]>): S => {
  const newState = {...state};
  // @ts-ignore
  newState[fieldName] = value;
  return newState;
};

/* State & Reducer Helpers */

export const combineReducersHelper = <S>(...reducers: ActionReducer<S>[]): (state: S, action: Action) => S => (state: S, action: Action) => {
  let newState = state;
  reducers.forEach(item => newState = item(newState, action));
  return newState;
};

/**
 * Short form to void including the {@link createFeatureSelector} in every {@link createSelector}
 * @param featureKey is the reducer name in the store
 *
 * Example:
 * ```typescript
 * const exampleSelector = createSelectorHelper<ExampleState>('example');
 * export const selectName = exampleSelector(state => state.name);
 * ```
 */
export const createSelectorHelper = <S>(featureKey: string) => {
  return <Result>(fn: (state: S) => Result) => createSelector(createFeatureSelector<S>(featureKey), fn);
};
