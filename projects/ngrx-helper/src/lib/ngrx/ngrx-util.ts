import {HttpErrorResponse} from '@angular/common/http';
import {LazyValue} from '../lazy-value';
import {Action, ActionCreator, ActionReducer, createFeatureSelector, createSelector} from '@ngrx/store';
import {TypedAction} from "@ngrx/store/src/models";

/**
 * Type for all Request Actions
 */
export interface RequestActionProps<REQ> {
  payload?: REQ;
}

/**
 * Type for all Response Actions
 */
export interface ResponseActionProps<REQ, RES> {
  payload: RES | null;
  requestPayload?: REQ;
}

/**
 * Type for all Error Actions
 */
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

// extract state manipulation to avoid typescript compile error
export const copyStateAndSetValue = <S, K extends keyof S>(state: S, fieldName: K, value: LazyValue<S[K]>): S => {
  const newState = {...state};
  // @ts-ignore
  newState[fieldName] = value;
  return newState;
};

/* State & Reducer Helpers */

/**
 * Combine an array of reducers for the same feature into a single reducer function.
 * Each reducer manipulates the state and returns it until all reducers are run
 * @param reducers An array of reducers which manipulates the same state
 *
 * @example
 *
 * ```typescript
 * const reducerForFeatureA = createReducer(...);
 * const reducer2ForFeatureA = createReducer(...);
 * const combinedReducer = combineFeatureReducers(reducerForFeatureA, reducer2ForFeatureA);
 * ```
 */
export const combineFeatureReducers = <S>(...reducers: ActionReducer<S>[]): (state: S, action: Action) => S => {
  return (state: S, action: Action) => {
    reducers.forEach((item: ActionReducer<S>) => state = item(state, action));
    return state;
  };
};

/**
 * Short form to avoid including the {@link createFeatureSelector} in every {@link createSelector}
 * @param featureKey is the reducer name in the store
 *
 * @example
 *
 * ```typescript
 * const exampleSelector = createSelectorHelper<ExampleState>('example');
 * export const selectName = exampleSelector(state => state.name);
 * ```
 */
export const createSelectorHelper = <S>(featureKey: string) => {
  return <Result>(fn: (state: S) => Result) => createSelector(createFeatureSelector<S>(featureKey), fn);
};
