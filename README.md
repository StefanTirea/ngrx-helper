# NGRX Helper Library

This NGRX Helper Library includes convenience methods to avoid `actions`, `reducers`, `effects` & `selectors` boilerplate code (especially for http calls).

**On top of that some miscellaneous features like:**

* Wrapper Type for loading Data (States: `value: T`, `isLoading: boolean` & `error: HttpErrorResponse`)
* Auto-Unsubscribe subscriptions on Component Destroy
* `*ngLet` Directive as an alternative to `*ngIf` but without removing the view when the value is falsy

## Ngrx Helper Implementation

1. Initial setup of the Store, Actions & Reducers

````typescript
import {LazyValue, createHttpReducer, createHttpActions} from 'shortlist-ngrx-helper';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export interface ProjectState {
  project?: LazyValue<Project>;
}

const initialState: ProjectState = {
  project: undefined
}

// {request, response, error, reset} Generates 4 Actions
// string => request payload type; Project => response payload type
export const projectLoadActions = createHttpActions<string, Project>('[PROJECT] Project by ID');

// generates 4 reducers which listens to all actions above (loading, value, error, empty)
export const appReducer = createHttpReducer(projectLoadActions, initialState, 'project');

// helper ngrx selector to avoid duplicate code
const selector = createSelectorHelper<ProjectState>('appReducer');
export const selectProject = selector(state => state.projects);
````

<br>

2. Listen on `projectLoadActions` and bind http service call to response action

````typescript
import {HttpClient} from '@angular/common/http';
import {createHttpEffect} from 'shortlist-ngrx-helper';
import {Actions} from '@ngrx/effects';

@Injectable()
export class ProjectEffects {

  project$ = createHttpEffect<string, Project>(
    this.actions$,
    projectLoadActions,
    (id: string) => this.http.get<Project[]>('/api/projects', {observe: 'response'})
  );

  constructor(private actions$: Actions,
              private http: HttpClient) {
  }
}
````

<br>

3. Use it in the application just like NGRX. Don't forget to include the `reducers` & `effects` in the Angular `Module`.

````typescript
@Component({...})
export class ProjectHelperComponent {

  project$: Observable<LazyValue<Project> | undefined>;

  constructor(private store: Store) {
    store.dispatch(projectLoadActions.request({})); // call backend
    this.projects$ = store.select(selectProjects);
  }

  // example reset action (sets project to empty)
  resetProject() {
    this.store.dispatch(projectLoadActions.reset({}));
  }
}
````

<br>

In case any error happens all the information needed are included in the `LazyValue` wrapper:

````typescript
export class LazyValue<T> {
  constructor(public value: T | undefined,
              public isLoading: boolean,
              public error: HttpErrorResponse | undefined) {
  }
}
````

## Example App

A very small example app can be found in `projects/demo-app`. This includes a brief comparison between `ngrx-data` (`project-data` directory)
and the `shortlist-ngrx-helper` (`project-helper` directory) implementation.

### Running the Example locally

1. Run `nmp start` & `npm mock-server` for a dev server.
2. Navigate to `http://localhost:4200/`.

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
