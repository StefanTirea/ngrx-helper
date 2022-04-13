import {createAction, createReducer, on, props} from '@ngrx/store';
import {createNewState, RequestActionProps} from './ngrx-util';

export const createAppActions = <REQ>(type: string) => {
  const request = createAction(type + ' (REQUEST)', props<RequestActionProps<REQ>>());
  const reset = createAction(type + ' (RESET)');
  return {request, reset};
};

export const createAppReducer = <S, K extends keyof S>(type: string, initState: S, fieldName: K) => {
  const actions = createAppActions<any>(type);
  return createReducer(
    initState,
    // @ts-ignore
    on(actions.request, (state: S, req: RequestActionProps<any>) => (createNewState(state, fieldName, req.payload))),
    // @ts-ignore
    on(actions.reset, (state: S) => (createNewState(state, fieldName, undefined))),
  );
};
