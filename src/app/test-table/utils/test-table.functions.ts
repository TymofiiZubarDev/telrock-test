import {
  TableRow,
  TableRowsObject,
} from '@test-table/interfaces/test-table.interfaces';

export function generateTableRowsArray(tableRowsObject: {
  [key: string]: TableRow;
}): TableRow[] {
  const newTableRows: TableRow[] = [];
  for (const key in tableRowsObject) {
    newTableRows.push(tableRowsObject[key]);
  }
  return newTableRows;
}

export function setTeamPercentageForPeriod(
  percent: number,
  teamName: string,
  period: string,
  tableRowsObject: TableRowsObject
): void {
  if (period === 'Today') {
    tableRowsObject[teamName]['today'] = (percent * 100).toFixed(2) + ' %';
    return;
  }
  if (period === 'MonthTD') {
    tableRowsObject[teamName]['monthtd'] = (percent * 100).toFixed(2) + ' %';
    return;
  }
  tableRowsObject[teamName]['yeartd'] = (percent * 100).toFixed(2) + ' %';
}
