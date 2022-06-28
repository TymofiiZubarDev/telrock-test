import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { environment } from "@env/environment";
import { DynamicKeysObjectOfStrings, TableObject } from "@test-table/interfaces/test-table.interfaces";

import { Observable } from "rxjs";

@Injectable()
export class TestTableService {

  constructor(private httpClient: HttpClient) {}

  public getTableData(selectedItems: DynamicKeysObjectOfStrings): Observable<TableObject> {
    return this.httpClient.get<TableObject>(
      environment.baseUrl +
        '/management-information?grouptype=summary&groupdescription=' +
        selectedItems['selectGroup'] +
        '&measurementdescription=' +
        selectedItems['selectMeasurement'] +
        '&resultrows=99'
    );
  }
}
