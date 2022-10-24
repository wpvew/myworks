import { ActionCreator } from 'redux';

export enum EViewport {
  table = 'table',
  mobile = 'mobile',
  desktop = 'desktop',
  unknown = 'unknown',
}

export const UPDATE_TYPE_VIEWPORT = 'UPDATE_TYPE_VIEWPORT';
export type TUpdateTypeViewport = {
  type: typeof UPDATE_TYPE_VIEWPORT;
  viewport: EViewport;
};
export const updateTypeViewport: ActionCreator<TUpdateTypeViewport> = (viewport: EViewport) => ({
  type: UPDATE_TYPE_VIEWPORT,
  viewport,
});
