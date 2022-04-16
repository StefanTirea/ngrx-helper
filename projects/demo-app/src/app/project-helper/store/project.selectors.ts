import {projectFeatureKey, ProjectState} from './project.store';
import {createSelectorHelper} from 'shortlist-ngrx-helper';

const selector = createSelectorHelper<ProjectState>(projectFeatureKey);

export const selectProjects = selector(state => state.projects);
export const selectProjectId = selector(state => state.selectedProjectId);
