import {ActionCreator, createAction, createReducer, on, props} from '@ngrx/store';
import {LazyValue} from './lazy-value';
import {createNewState, ErrorActionProps, RequestActionProps, ResponseActionProps} from './ngrx-util';

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
