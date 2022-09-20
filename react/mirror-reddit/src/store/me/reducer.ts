import { Reducer } from 'react';
import { IUserData, ME_REQUERST, ME_REQUERST_ERROR, ME_REQUERST_SUCCESS, TMeRequestAction, TMeRequestErrorAction, TMeRequestSuccessAction } from './action';

export type TMeState = {
  loading: boolean;
  error: string;
  data: IUserData;
};

type MeActions = TMeRequestAction | TMeRequestSuccessAction | TMeRequestErrorAction;
export const meReducer: Reducer<TMeState, MeActions> = (state, action) => {
  switch (action.type) {
    case ME_REQUERST: {
      return {
        ...state,
        loading: true,
      };
    }
    case ME_REQUERST_ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }
    case ME_REQUERST_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    }
    default:
      return state;
  }
};
