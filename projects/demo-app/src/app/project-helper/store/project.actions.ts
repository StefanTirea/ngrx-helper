import {createAppActions, createHttpActions} from 'ngrx-helper';
import {Project} from '../model/project.model';

export const projectLoadActions = createHttpActions<void, Project[]>('[PROJECT-HELPER] Project Load');
export const selectedProjectIdActions = createAppActions<string>('[PROJECT-HELPER] Selected Project ID');
