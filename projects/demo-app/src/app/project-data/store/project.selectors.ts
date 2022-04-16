import {projectFeatureKey, ProjectState} from './project.store';
import {createSelectorHelper} from 'ngrx-helper';

const selector = createSelectorHelper<ProjectState>(projectFeatureKey)

export const selectProjectId = selector(state => state.selectedProjectId);
