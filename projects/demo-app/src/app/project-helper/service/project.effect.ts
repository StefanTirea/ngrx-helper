import {Injectable} from '@angular/core';
import {Actions, createEffect} from '@ngrx/effects';
import {ProjectService} from './project.service';
import {projectLoadActions} from '../store/project.actions';
import {createHttpEffect} from '../../../../../shortlist-ngrx-helper/src/lib/ngrx/ngrx-http-helper';
import {tap} from 'rxjs/operators';
import {Project} from '../model/project.model';

@Injectable()
export class ProjectEffects {

  projects$ = createHttpEffect<void, Project[]>(this.actions$, projectLoadActions, () => this.projectService.getAllProjects());

  logger$ = createEffect(() => this.actions$.pipe(
    tap((action) => console.log(action))
  ), {dispatch: false});

  constructor(private actions$: Actions,
              private projectService: ProjectService) {
  }
}
