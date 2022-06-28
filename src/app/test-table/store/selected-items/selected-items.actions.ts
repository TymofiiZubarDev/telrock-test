import { createAction, props } from '@ngrx/store';
import { DynamicKeysObjectOfStrings } from '@test-table/interfaces/test-table.interfaces';

export enum changeActionTypes {
  setSelectedItem = '[Test Table] Set Selected item',
}

export const setSelectedItemAction = createAction(
  changeActionTypes.setSelectedItem,
  props<DynamicKeysObjectOfStrings>()
);
