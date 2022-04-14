import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {ProjectEffects} from './service/project.effect';
import {HttpClientModule} from '@angular/common/http';
import {projectFeatureKey, projectReducer, ProjectState} from './store/project.store';
import {ProjectService} from './service/project.service';
import {ProjectHelperComponent} from './project-helper/project-helper.component';
import {LetModule} from '../../../../shortlist-ngrx-helper/src/lib/let/let.module';


@NgModule({
  declarations: [
    ProjectHelperComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(projectFeatureKey, projectReducer),
    EffectsModule.forFeature([ProjectEffects]),
    HttpClientModule,
    LetModule
  ],
  exports: [
    ProjectHelperComponent,
  ],
  providers: [ProjectService]
})
export class ProjectHelperModule {
}