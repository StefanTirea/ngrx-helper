import {createFeatureSelector, createSelector} from '@ngrx/store';
import {projectFeatureKey, ProjectState} from './project.store';

const selectFeature = createFeatureSelector<ProjectState>(projectFeatureKey);

export const selectProjectId = createSelector(selectFeature, state => state.selectedProjectId);
