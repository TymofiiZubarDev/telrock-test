import { createFeatureSelector, createSelector } from '@ngrx/store';

import { DynamicKeysObjectOfStrings } from '@test-table/interfaces/test-table.interfaces';
import { testTableNode } from '@test-table/store/constants/test-table';
import { selectedItemsNode } from '@test-table/store/selected-items/selected-items.reducer';

const selectSelectedItemsFeature = createFeatureSelector<{
  [selectedItemsNode]: DynamicKeysObjectOfStrings;
}>(testTableNode);

export const selectSelectedItems = createSelector(
  selectSelectedItemsFeature, (state: {
    [selectedItemsNode]: DynamicKeysObjectOfStrings;
  }): DynamicKeysObjectOfStrings => state[selectedItemsNode]
);

export const selectSelectedGroup = createSelector(
  selectSelectedItemsFeature, (state: { [selectedItemsNode]: DynamicKeysObjectOfStrings }): string =>
    state[selectedItemsNode]['selectGroup']
);
