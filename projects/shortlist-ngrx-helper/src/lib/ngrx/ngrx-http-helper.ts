import {ActionCreator, createAction, createReducer, on, props} from '@ngrx/store';
import {LazyValue} from '../lazy-value';
import {createNewState, ErrorActionProps, RequestActionProps, ResponseActionProps} from './ngrx-util';
import {Actions, createEffect, CreateEffectMetadata, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

/**
 * Holds all possible required actions to call & handle a REST Endpoint
 */
export interface HttpActions {
  request: ActionCreator<any, any>,
  response: ActionCreator<any, any>,
  error: ActionCreator<any, any>,
  reset: ActionCreator<any, any>,
}

export const createHttpActions = <REQ, RES>(type: string): HttpActions => {
  const request = createAction(type + ' (REQUEST)', props<RequestActionProps<REQ>>());
  const response = createAction(type + ' (RESPONSE)', props<ResponseActionProps<REQ, RES>>());
  const error = createAction(type + ' (ERROR)', props<ErrorActionProps<REQ>>());
  const reset = createAction(type + ' (RESET)');
  return {request, response, error, reset} as HttpActions;
};


export const createHttpReducer = <S, K extends keyof S>(actions: HttpActions, initState: S, fieldName: K) => {
  return createReducer(
    initState,
    // @ts-ignore
    on(actions.request, (state: S) => (createNewState(state, fieldName, LazyValue.loading()))),
    // @ts-ignore
    on(actions.response, (state: S, resp: ResponseActionProps<any, any>) => (createNewState(state, fieldName, LazyValue.just(resp.payload)))),
    // @ts-ignore
    on(actions.error, (state: S, error: ErrorActionProps<any>) => (createNewState(state, fieldName, LazyValue.error(error.httpError)))),
    // @ts-ignore
    on(actions.reset, (state: S) => (createNewState(state, fieldName, LazyValue.loading()))),
  );
};

export const createHttpEffect = <REQ, RES>(actions$: Actions, myAction: HttpActions, fn: (payload: REQ | undefined) => Observable<HttpResponse<RES>>): Observable<HttpResponse<RES>> & CreateEffectMetadata => {
  return createEffect(() => actions$.pipe(
      ofType(myAction.request),
      mergeMap((payload: RequestActionProps<REQ>) => fn(payload.payload)
        .pipe(
          map(httpResponse => myAction.response({payload: httpResponse.body, requestPayload: payload.payload})),
          catchError((err: HttpErrorResponse) => of(myAction.error({requestPayload: payload.payload, httpStatus: err.status, httpError: err})))
        ))
    )
  );
};
