import { map, Observable } from "rxjs";

import { TableItem, TableObject, TableRowsObject } from "@test-table/interfaces/test-table.interfaces";
import { setTeamPercentageForPeriod } from "@test-table/utils/test-table.functions";

export function extractTableRowsObject(source$: Observable<TableObject>): Observable<TableRowsObject> {
  return source$.pipe(
    map((tableData: TableObject) => {
      let tableRowsObject: TableRowsObject = {};

      tableData.results.forEach((item: TableItem) => {
        if (!tableRowsObject[item.kpiTeamName]) {
          tableRowsObject = {
            ...tableRowsObject,
            [item.kpiTeamName]: {
              teamName: item.kpiTeamName,
              today: '0',
              monthtd: '0',
              yeartd: '0',
            },
          };
        }
        setTeamPercentageForPeriod(
          item.kpiAchievementPercent,
          item.kpiTeamName,
          item.kpiPeriod,
          tableRowsObject
        );
      });

      return tableRowsObject;
    })
  );
}
