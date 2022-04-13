import {createHttpReducer} from '../../../../shortlist-ngrx-helper/src/lib/ngrx-http-helper';
import {LazyValue} from '../../../../shortlist-ngrx-helper/src/lib/lazy-value';
import {createAction, createReducer, on} from '@ngrx/store';
import {projectActions} from './actions';

export interface ProjectState {
  projects?: LazyValue<Project[]>;
  selectedProjectId?: string;
}

const initialState: ProjectState = {
  projects: undefined,
  selectedProjectId: undefined
};


const id8Reducer = createHttpReducer(projectActions, initialState, 'projects');

const appReducer = createReducer(
  initialState,
  on(createAction('meh'), (state) => ({...state, projects: undefined})),
);

export const appReducers = id8Reducer;


export class Project {
  constructor(public id: string,
              public name: string) {
  }
}

