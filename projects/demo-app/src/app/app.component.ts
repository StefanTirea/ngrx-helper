import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {projectActions} from './store/actions';
import {LazyValue} from '../../../shortlist-ngrx-helper/src/lib/lazy-value';
import {Project, ProjectState} from './store/store';
import {selectProjects} from './store/selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  projects$?: Observable<LazyValue<Project[]> | undefined>;

  constructor(private store: Store<ProjectState>) {
    store.dispatch(projectActions.request({}));
    this.projects$ = store.select(selectProjects);
  }
}
