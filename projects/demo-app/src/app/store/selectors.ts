import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ProjectState} from './store';

export const selectFeature = createFeatureSelector<ProjectState>('appReducers');

export const selectProjects = createSelector(
  selectFeature,
  state => state.projects
);
