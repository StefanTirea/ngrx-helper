import {Component} from '@angular/core';
import {Observable} from 'rxjs';
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
    projectService.getAll();
    this.projects$ = projectService.entities$;
    this.loading$ = projectService.loading$;
    // auto unsubscribe would also be required
    this.projects$.subscribe({
      error: err => {
        this.error = true;
        console.log(err);
      }
    });
    this.selectedProject$ = store.select(selectProjectId);
  }

  selectProject(id: string) {
    this.store.dispatch(selectedProjectIdActions.request({payload: id}));
  }

  resetSelectedProject() {
    this.store.dispatch(selectedProjectIdActions.reset({}));
  }
}
