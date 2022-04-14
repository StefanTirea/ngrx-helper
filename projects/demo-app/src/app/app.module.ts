import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {CommonModule} from '@angular/common';
import {ProjectHelperModule} from './project-helper/project-helper.module';
import {ProjectDataModule} from './project-data/project-data.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot(),
    CommonModule,
    ProjectHelperModule,
    ProjectDataModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
