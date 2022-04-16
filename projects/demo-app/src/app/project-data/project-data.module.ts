import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EntityDataModule} from '@ngrx/data';
import {entityConfig} from './store/entity.config';
import {ProjectViewComponent} from './project-view/project-view.component';
import {ProjectService} from './service/project.service';
import {StoreModule} from '@ngrx/store';
import {projectFeatureKey, projectReducer} from './store/project.store';
import {LetDirectiveModule} from 'shortlist-ngrx-helper';


@NgModule({
  declarations: [
    ProjectViewComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(projectFeatureKey, projectReducer),
    EntityDataModule.forRoot(entityConfig),
    LetDirectiveModule
  ],
  providers: [ProjectService],
  exports: [ProjectViewComponent]
})
export class ProjectDataModule {
}
