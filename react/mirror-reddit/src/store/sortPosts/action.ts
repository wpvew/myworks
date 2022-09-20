import { ActionCreator } from 'redux';
import { TSortSelectValue } from '../../shared/Header/SortBlock';

export const UPDATE_SORT_SELECT = 'UPDATE_SORT_SELECT';
export type TUpdateSortSelect = {
  type: typeof UPDATE_SORT_SELECT;
  selectValue: TSortSelectValue;
};

export const updataSortSelect: ActionCreator<TUpdateSortSelect> = (selectValue: TSortSelectValue) => ({
  type: UPDATE_SORT_SELECT,
  selectValue,
});
