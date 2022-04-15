import {LazyValue} from '../../../../../shortlist-ngrx-helper/src/lib/lazy-value';
import {createHttpReducer} from '../../../../../shortlist-ngrx-helper/src/lib/ngrx/ngrx-http-helper';
import {projectLoadActions, selectedProjectIdActions} from './project.actions';
import {combineReducersHelper} from '../../../../../shortlist-ngrx-helper/src/lib/ngrx/ngrx-util';
import {createAppReducer} from '../../../../../shortlist-ngrx-helper/src/lib/ngrx/ngrx-app-helper';
import {Project} from '../model/project.model';

export const projectFeatureKey = 'project-helper';

export interface ProjectState {
  projects?: LazyValue<Project[]>;
  selectedProjectId?: string;
}

const initialState: ProjectState = {
  projects: undefined,
  selectedProjectId: undefined
};


export const projectReducer = combineReducersHelper(
  createHttpReducer(projectLoadActions, initialState, 'projects'),
  createAppReducer(selectedProjectIdActions, initialState, 'selectedProjectId')
);
