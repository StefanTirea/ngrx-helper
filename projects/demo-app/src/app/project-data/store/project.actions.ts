import {createAppActions} from '../../../../../shortlist-ngrx-helper/src/lib/ngrx/ngrx-app-helper';

export const selectedProjectIdActions = createAppActions<string>('[PROJECT-DATA] Selected Project ID');
