import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';

import { RowClassArgs } from '@progress/kendo-angular-grid';
import { BehaviorSubject, Observable, Subject, switchMap, takeUntil } from 'rxjs';

import { DynamicKeysObjectOfStrings, TableRow, TableRowsObject } from '@test-table/interfaces/test-table.interfaces';
import { CustomDropDownService } from '@test-table/services/custom-drop-down.service';
import { TestTableService } from '@test-table/services/test-table.service';
import { selectSelectedGroup, selectSelectedItems } from '@test-table/store/selected-items/selected-items.selectors';
import { extractTableRowsObject } from '@test-table/utils/extract-table-rows.operator';
import { generateTableRowsArray } from '@test-table/utils/test-table.functions';

@Component({
  selector: 'app-test-table',
  templateUrl: './test-table.component.html',
  styleUrls: ['test-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestTableComponent implements OnInit, OnDestroy {
  public selectMeasurementItems$!: Observable<string[]>;
  public selectGroupItems$: Observable<string[]> = this.customDropDownService.getGroups();
  public isLoading$ = new BehaviorSubject<boolean>(false);
  public tableRows$ = new BehaviorSubject<TableRow[]>([]);

  private selectedItems!: DynamicKeysObjectOfStrings;
  private readonly destroy$: Subject<void> = new Subject<void>();

  constructor(
    private customDropDownService: CustomDropDownService,
    private store: Store,
    private testTableService: TestTableService
  ) {}

  ngOnInit(): void {
    this.selectMeasurementItems$ = this.store.select(selectSelectedGroup).pipe(
      switchMap((selectedGroup: string) => this.customDropDownService.getMeasurements(selectedGroup))
    );

    this.store.select(selectSelectedItems).pipe(
      takeUntil(this.destroy$),
    ).subscribe((selectedItems: DynamicKeysObjectOfStrings) => this.selectedItems = selectedItems);

    this.run();
  }

  public run(): void {
    this.tableRows$.next([]);
    this.isLoading$.next(true);

    this.testTableService.getTableData(this.selectedItems).pipe(
      takeUntil(this.destroy$),
      extractTableRowsObject
    ).subscribe((tableRowsObject: TableRowsObject) => {
      this.tableRows$.next(generateTableRowsArray(tableRowsObject));
      this.isLoading$.next(false);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
