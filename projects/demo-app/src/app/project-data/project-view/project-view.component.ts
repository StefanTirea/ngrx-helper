import {Component} from '@angular/core';
import {catchError, EMPTY, Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {ProjectService} from '../service/project.service';
import {selectProjectId} from '../store/project.selectors';
import {selectedProjectIdActions} from '../store/project.actions';
import {Project} from '../model/project.model';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html'
})
export class ProjectViewComponent {

  projects$: Observable<Project[]>;
  loading$: Observable<boolean>;
  error = false;

  selectedProject$: Observable<string | undefined>;

  constructor(private store: Store,
              private projectService: ProjectService) {
    // subscription in view => must use *ngLet because in case of error is undefined :/
    this.projects$ = projectService.getAll()
      .pipe(catchError(() => {
        this.error = true;
        return EMPTY;
      }));
    this.loading$ = projectService.loading$;
    this.selectedProject$ = store.select(selectProjectId);
  }

  selectProject(id: string) {
    this.store.dispatch(selectedProjectIdActions.request({payload: id}));
  }

  resetSelectedProject() {
    this.store.dispatch(selectedProjectIdActions.reset({}));
  }
}
