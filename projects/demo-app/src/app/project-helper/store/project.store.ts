import {projectLoadActions, selectedProjectIdActions} from './project.actions';
import {Project} from '../model/project.model';
import {combineFeatureReducers, createAppReducer, createHttpReducer, LazyValue} from 'ngrx-helper';

export const projectFeatureKey = 'project-helper';

export interface ProjectState {
  projects?: LazyValue<Project[]>;
  selectedProjectId?: string;
}

const initialState: ProjectState = {
  projects: undefined,
  selectedProjectId: undefined
};


export const projectReducer = combineFeatureReducers(
  createHttpReducer(initialState, projectLoadActions, 'projects'),
  createAppReducer(initialState, selectedProjectIdActions, 'selectedProjectId')
);
