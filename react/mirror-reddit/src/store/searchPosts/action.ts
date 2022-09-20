import { ActionCreator } from 'redux';

export const UPDATE_SEARCH_INPUT = 'UPDATE_SEARCH_INPUT';
export type TUpdateSearchInput = {
  type: typeof UPDATE_SEARCH_INPUT;
  searchInputValue: string;
};

export const updateSearchInput: ActionCreator<TUpdateSearchInput> = (searchInputValue: string) => ({
  type: UPDATE_SEARCH_INPUT,
  searchInputValue,
});
