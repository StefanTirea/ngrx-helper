import {createHttpActions} from '../../../../../shortlist-ngrx-helper/src/lib/ngrx/ngrx-http-helper';
import {createAppActions} from '../../../../../shortlist-ngrx-helper/src/lib/ngrx/ngrx-app-helper';
import {Project} from '../model/project.model';

export const projectLoadActions = createHttpActions<void, Project[]>('[PROJECT-HELPER] Project Load');
export const selectedProjectIdActions = createAppActions<string>('[PROJECT-HELPER] Selected Project ID');
