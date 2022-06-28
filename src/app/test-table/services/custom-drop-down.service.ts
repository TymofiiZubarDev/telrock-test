import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '@env/environment';

@Injectable()
export class CustomDropDownService {

  constructor(private httpClient: HttpClient) {}

  public getGroups(): Observable<string[]> {
    return this.httpClient.get<string[]>(
      environment.baseUrl + '/management-information/group-descriptions'
    );
  }

  public getMeasurements(selectedGroup: string): Observable<string[]> {
    return this.httpClient.get<string[]>(
      environment.baseUrl +
        '/management-information/measurement-descriptions?groupdescription=' +
        selectedGroup
    );
  }
}
