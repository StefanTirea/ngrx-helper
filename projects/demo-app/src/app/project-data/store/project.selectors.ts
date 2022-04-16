import {projectFeatureKey, ProjectState} from './project.store';
import {createSelectorHelper} from 'shortlist-ngrx-helper';

const selector = createSelectorHelper<ProjectState>(projectFeatureKey)

export const selectProjectId = selector(state => state.selectedProjectId);
