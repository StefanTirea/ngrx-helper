import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Project} from '../model/project.model';

@Injectable()
export class ProjectService {

  constructor(private http: HttpClient) {
  }

  public getAllProjects(): Observable<HttpResponse<Project[]>> {
    return this.http.get<Project[]>('/api/projects', {observe: 'response'});
  }
}
