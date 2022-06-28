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
  color: string,
  tableRowsObject: TableRowsObject
): void {
  if (period === 'Today') {
    tableRowsObject[teamName]['today'] = (percent * 100).toFixed(2) + ' %';
    tableRowsObject[teamName]['colors'][0] = color;
    return;
  }
  if (period === 'MonthTD') {
    tableRowsObject[teamName]['monthtd'] = (percent * 100).toFixed(2) + ' %';
    tableRowsObject[teamName]['colors'][1] = color;
    return;
  }
  tableRowsObject[teamName]['yeartd'] = (percent * 100).toFixed(2) + ' %';
  tableRowsObject[teamName]['colors'][2] = color;
}
