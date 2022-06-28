import { ActionReducerMap } from '@ngrx/store';

import { DynamicKeysObjectOfStrings } from '@test-table/interfaces/test-table.interfaces';
import {
  selectedItemsNode,
  selectedGroupReducer,
} from '@test-table/store/selected-items/selected-items.reducer';

export interface State {
  [selectedItemsNode]: DynamicKeysObjectOfStrings;
}

export const reducers: ActionReducerMap<State> = {
  [selectedItemsNode]: selectedGroupReducer,
};
