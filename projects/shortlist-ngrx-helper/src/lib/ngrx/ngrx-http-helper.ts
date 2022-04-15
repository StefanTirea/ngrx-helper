import {createAction, createReducer, on, props} from '@ngrx/store';
import {LazyValue} from '../lazy-value';
import {
  copyStateAndSetValue,
  ErrorAction,
  ErrorActionCreator,
  ErrorActionProps,
  RequestActionCreator,
  RequestActionProps,
  ResetActionCreator,
  ResponseAction,
  ResponseActionCreator,
  ResponseActionProps
} from './ngrx-util';
import {Actions, createEffect, CreateEffectMetadata, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

/**
 * Holds all possible required actions to call & handle a REST Endpoint
 */
export interface HttpActions<REQ, RES> {
  request: RequestActionCreator<REQ>,
  response: ResponseActionCreator<REQ, RES>,
  error: ErrorActionCreator<REQ>,
  reset: ResetActionCreator
}

/**
 * Create 4 actions to handle backend data (request, response, error & error)
 * Adds a suffix for each action to distinguish them from each other
 *
 * @param type An unique Action name
 *
 * @example
 *
 * Create Actions to load Project from the Backend:
 * ```typescript
 * // string => request payload; Project => response payload
 * export const projectLoadActions = createHttpActions<string, Project>('[PROJECT] Project by ID');
 * ```
 */
export const createHttpActions = <REQ, RES>(type: string): HttpActions<REQ, RES> => {
  const request = createAction(type + ' (REQUEST)', props<RequestActionProps<REQ>>());
  const response = createAction(type + ' (RESPONSE)', props<ResponseActionProps<REQ, RES>>());
  const error = createAction(type + ' (ERROR)', props<ErrorActionProps<REQ>>());
  const reset = createAction(type + ' (RESET)');
  return {request, response, error, reset};
};

/**
 * Create reducers for {@link HttpActions} which handles all possible action variants.
 *
 * @param actions Created
 * @param fieldName Field name in State which should be changed when one of the
 * @param initState Initial State
 *
 * @example
 *
 * ```typescript
 * export const projectLoadActions = createHttpActions<string, Project>('[PROJECT] Project by ID');
 * const initState = {project: undefined};
 *
 * // Reference {@var projectReducer} in StoreModule or combine other reducers with {@link combineFeatureReducers}
 * export const projectReducer = createHttpReducer(initState, projectLoadActions, 'project');
 * ```
 */
export const createHttpReducer = <S, K extends keyof S>(initState: S, actions: HttpActions<any, any>, fieldName: K) => {
  return createReducer(
    initState,
    // @ts-ignore
    on(actions.request, (state: S) => (copyStateAndSetValue(state, fieldName, LazyValue.loading()))),
    // @ts-ignore
    on(actions.response, (state: S, resp: ResponseActionProps<any, any>) => (copyStateAndSetValue(state, fieldName, LazyValue.just(resp.payload)))),
    // @ts-ignore
    on(actions.error, (state: S, error: ErrorActionProps<any>) => (copyStateAndSetValue(state, fieldName, LazyValue.error(error.httpError)))),
    // @ts-ignore
    on(actions.reset, (state: S) => (copyStateAndSetValue(state, fieldName, undefined))),
  );
};

/**
 * Create effect for http call to backend and error handling for {@link HttpActions} request.
 *
 * @param allActions$ Pass Ngrx {@link Actions} Observable which listens for all actions
 * @param httpActions Handle http call response or error for {@link HttpActions} on request
 * @param fn Http Service call function
 *
 * @example
 *
 * ```typescript
 * import {HttpClient} from '@angular/common/http';
 * import {createHttpEffect} from 'shortlist-ngrx-helper';
 * import {Actions} from '@ngrx/effects';
 *
 * @Injectable()
 * export class ProjectEffects {
 *
 *    export const projectLoadActions = createHttpActions<string, Project>('[PROJECT] Project by ID');
 *
 *    project$ = createHttpEffect<string, Project>(
 *      this.actions$,
 *      projectLoadActions,
 *      (id: string) => this.http.get<Project>(`/api/projects/${id}`, {observe: 'response'})
 *    );
 *
 *    constructor(private actions$: Actions,
 *                private http: HttpClient) {
 *    }
 * }
 * ```
 */
export const createHttpEffect = <REQ, RES>(allActions$: Actions, httpActions: HttpActions<REQ, RES>, fn: (payload: REQ | undefined) => Observable<HttpResponse<RES>>): Observable<ResponseAction<REQ, RES> | ErrorAction<REQ>> & CreateEffectMetadata => {
  return createEffect(() => allActions$.pipe(
      ofType(httpActions.request),
      mergeMap((payload: RequestActionProps<REQ>) => fn(payload.payload)
        .pipe(
          map(httpResponse => httpActions.response({payload: httpResponse.body, requestPayload: payload.payload})),
          catchError((err: HttpErrorResponse) => of(httpActions.error({
            requestPayload: payload.payload,
            httpStatus: err.status,
            httpError: err
          })))
        ))
    )
  );
};
