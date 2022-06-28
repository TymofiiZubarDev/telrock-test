import { createReducer, on } from '@ngrx/store';
import { DynamicKeysObjectOfStrings } from '@test-table/interfaces/test-table.interfaces';
import { setSelectedItemAction } from '@test-table/store/selected-items/selected-items.actions';

export const selectedItemsNode = 'selectedItems';

const initialState: DynamicKeysObjectOfStrings = {
  selectGroup: 'Customer_Outcome',
  selectMeasurement: 'Understand',
};

export const selectedGroupReducer = createReducer(
  initialState,
  on(setSelectedItemAction, (state, data: DynamicKeysObjectOfStrings) => {
    let { type, ...newData } = data;
    return {
      ...state,
      ...newData,
    };
  })
);
