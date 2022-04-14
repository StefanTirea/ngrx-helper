import {selectedProjectIdActions} from './project.actions';
import {combineHelperReducers} from '../../../../../shortlist-ngrx-helper/src/lib/ngrx/ngrx-util';
import {createAppReducer} from '../../../../../shortlist-ngrx-helper/src/lib/ngrx/ngrx-app-helper';

export const projectFeatureKey = 'project-data';

export interface ProjectState {
  selectedProjectId?: string;
}

const initialState: ProjectState = {
  selectedProjectId: undefined
};


export const projectReducer = combineHelperReducers(
  createAppReducer(selectedProjectIdActions, initialState, 'selectedProjectId')
);