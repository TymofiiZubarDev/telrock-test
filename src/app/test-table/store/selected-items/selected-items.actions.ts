import { createAction, props } from '@ngrx/store';
import { DynamicKeysObjectOfStrings } from '@test-table/interfaces/test-table.interfaces';

export enum changeActionTypes {
  setSelectedItem = '[SET] Selected item',
}

export const setSelectedItemAction = createAction(
  changeActionTypes.setSelectedItem,
  props<DynamicKeysObjectOfStrings>()
);
