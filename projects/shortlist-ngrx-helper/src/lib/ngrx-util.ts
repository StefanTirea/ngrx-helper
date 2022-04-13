import {HttpErrorResponse} from '@angular/common/http';
import {LazyValue} from './lazy-value';

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
