import {ActionCreator, createAction, createReducer, on, props} from '@ngrx/store';
import {createNewState, RequestActionProps} from './ngrx-util';

/**
 * Holds all possible required actions to handle an internal App action
 */
export interface AppActions {
  request: ActionCreator<any, any>,
  reset: ActionCreator<any, any>,
}

export const createAppActions = <REQ>(type: string) => {
  const request = createAction(type + ' (REQUEST)', props<RequestActionProps<REQ>>());
  const reset = createAction(type + ' (RESET)');
  return {request, reset} as AppActions;
};

export const createAppReducer = <S, K extends keyof S>(actions: AppActions, initState: S, fieldName: K) => {
  return createReducer(
    initState,
    // @ts-ignore
    on(actions.request, (state: S, req: RequestActionProps<any>) => (createNewState(state, fieldName, req.payload))),
    // @ts-ignore
    on(actions.reset, (state: S) => (createNewState(state, fieldName, undefined))),
  );
};
