import {selectedProjectIdActions} from './project.actions';
import {combineFeatureReducers, createAppReducer} from 'shortlist-ngrx-helper';

export const projectFeatureKey = 'project-data';

export interface ProjectState {
  selectedProjectId?: string;
}

const initialState: ProjectState = {
  selectedProjectId: undefined
};


export const projectReducer = combineFeatureReducers(
  createAppReducer(initialState, selectedProjectIdActions, 'selectedProjectId')
);
