import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {LazyValue} from 'ngrx-helper';
import {Store} from '@ngrx/store';
import {projectLoadActions, selectedProjectIdActions} from '../store/project.actions';
import {selectProjectId, selectProjects} from '../store/project.selectors';
import {Project} from '../model/project.model';

@Component({
  selector: 'app-project-helper',
  templateUrl: './project-helper.component.html'
})
export class ProjectHelperComponent {

  projects$: Observable<LazyValue<Project[]> | undefined>;
  selectedProject$: Observable<string | undefined>;

  constructor(private store: Store) {
    store.dispatch(projectLoadActions.request({}));
    this.projects$ = store.select(selectProjects);
    this.selectedProject$ = store.select(selectProjectId);
  }

  selectProject(id: string) {
    this.store.dispatch(selectedProjectIdActions.request({payload: id}));
  }

  resetSelectedProject() {
    this.store.dispatch(selectedProjectIdActions.reset({}));
  }
}
