import { ActionCreator } from 'redux';

// export type TModalIsOpened = {
//   isModalOpened: boolean;
// };

export const UPDATE_MODAL_STATUS = 'UPDATE_MODAL_STATUS';
export type TUpdateModalStatus = {
  type: typeof UPDATE_MODAL_STATUS;
  isModalOpened: boolean;
};
export const updateModalStatus: ActionCreator<TUpdateModalStatus> = (isModalOpened: boolean) => ({
  type: UPDATE_MODAL_STATUS,
  isModalOpened,
});
