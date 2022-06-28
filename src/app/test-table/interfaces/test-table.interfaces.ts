export interface DynamicKeysObjectOfStrings {
  [key: string]: string;
}

export interface TableObject {
  results: TableItem[];
  totalResultCount: number;
}

export interface TableItem {
  externalMiId: number;
  kpiAchievementAmount: number;
  kpiAchievementPercent: number;
  kpiColor: string;
  kpiGroupDescription: string;
  kpiGroupType: string;
  kpiMeasurementDescription: string;
  kpiPeriod: string;
  kpiRating: string;
  kpiTeamName: string;
  kpiUserName: string;
}

export interface TableRowsObject {
  [key: string]: TableRow;
}

export interface TableRow {
  teamName: string;
  today: string;
  monthtd: string;
  yeartd: string;
}
