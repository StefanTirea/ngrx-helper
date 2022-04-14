import {HttpErrorResponse} from '@angular/common/http';
import {LazyValue} from '../lazy-value';
import {Action, ActionReducer} from '@ngrx/store';

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

export const createNewState = <S, K extends keyof S>(state: S, fieldName: K, value: LazyValue<S[K]>): S => {
  const newState = {...state};
  // @ts-ignore
  newState[fieldName] = value;
  return newState;
};

export const combineHelperReducers = <S>(...reducers: ActionReducer<S>[]): (state: S, action: Action) => S => (state: S, action: Action) => {
  let newState = state;
  reducers.forEach(item => {
    newState = item(newState, action);
  });
  return newState;
};
