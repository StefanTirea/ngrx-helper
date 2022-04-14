import {EntityMetadataMap} from '@ngrx/data';
import {Project} from '../model/project.model';

const entityMetadata: EntityMetadataMap = {
  Project: {selectId: (project: Project) => project.id}
};

const pluralNames = { Project: 'Projects' };

export const entityConfig = {
  entityMetadata,
  pluralNames
};
