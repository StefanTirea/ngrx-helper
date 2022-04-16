import {createAppActions, createHttpActions} from 'shortlist-ngrx-helper';
import {Project} from '../model/project.model';

export const projectLoadActions = createHttpActions<void, Project[]>('[PROJECT-HELPER] Project Load');
export const selectedProjectIdActions = createAppActions<string>('[PROJECT-HELPER] Selected Project ID');
