import { ClientData } from './ClientState';
import { ClientGroup } from './ClientGroup';

interface Action<Type extends string> {
  type: Type;
}

interface ActionWithPayload<Type extends string, Payload> extends Action<Type> {
  payload: Payload;
}

export type BackAction = Action<'BackAction'>;

export type SetActiveGroupAction = ActionWithPayload<
  'SetActiveGroupAction',
  ClientGroup | undefined
>;

export type SetDataAction = ActionWithPayload<'SetDataAction', ClientData>;

export type SetOverflewGroupAction = ActionWithPayload<
  'SetOverflewGroupAction',
  ClientGroup | undefined
>;

export type SetSearchQueryAction = ActionWithPayload<
  'SetSearchQueryAction',
  string
>;

export type SetSelectedPageGroupsAction = ActionWithPayload<
  'SetSelectedPageGroupsAction',
  ClientGroup[]
>;

export type SetSidebarPinnedAction = ActionWithPayload<
  'SetSidebarPinnedAction',
  boolean
>;

export type ClientAction =
  | BackAction
  | SetActiveGroupAction
  | SetDataAction
  | SetOverflewGroupAction
  | SetSearchQueryAction
  | SetSelectedPageGroupsAction
  | SetSidebarPinnedAction;
