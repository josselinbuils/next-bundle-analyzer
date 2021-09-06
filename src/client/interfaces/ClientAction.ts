import { ClientData } from './ClientState';
import { ClientGroup } from './ClientGroup';

export const BACK_ACTION = 'BACK';
export const SET_ACTIVE_GROUP_ACTION = 'SET_ACTIVE_GROUP';
export const SET_OVERFLEW_GROUP_ACTION = 'SET_OVERFLEW_GROUP';
export const SET_DATA_ACTION = 'SET_DATA';

interface Action<Type extends string> {
  type: Type;
}

interface ActionWithPayload<Type extends string, Payload> extends Action<Type> {
  payload: Payload;
}

export type BackAction = Action<typeof BACK_ACTION>;

export type SetActiveGroupAction = ActionWithPayload<
  typeof SET_ACTIVE_GROUP_ACTION,
  ClientGroup | undefined
>;

export type SetOverflewGroupAction = ActionWithPayload<
  typeof SET_OVERFLEW_GROUP_ACTION,
  ClientGroup | undefined
>;

export type SetDataAction = ActionWithPayload<
  typeof SET_DATA_ACTION,
  ClientData
>;

export type ClientAction =
  | BackAction
  | SetActiveGroupAction
  | SetOverflewGroupAction
  | SetDataAction;
