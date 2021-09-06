import { ClientState } from '../interfaces/ClientState';
import {
  BACK_ACTION,
  ClientAction,
  SET_ACTIVE_GROUP_ACTION,
  SET_DATA_ACTION,
  SET_OVERFLEW_GROUP_ACTION,
} from '../interfaces/ClientAction';

export function clientReducer(
  state: ClientState,
  action: ClientAction
): ClientState {
  switch (action.type) {
    case BACK_ACTION: {
      const current = state.data.past.pop();

      if (!current) {
        return state;
      }
      return {
        ...state,
        activeGroup:
          current.groups.length === 1 ? current.groups[0] : undefined,
        data: {
          ...state.data,
          current,
        },
      };
    }

    case SET_ACTIVE_GROUP_ACTION:
      return {
        ...state,
        activeGroup: action.payload,
      };

    case SET_OVERFLEW_GROUP_ACTION:
      return {
        ...state,
        overflewGroup: action.payload,
      };

    case SET_DATA_ACTION:
      return {
        ...state,
        data: {
          past: [...state.data.past, state.data.current].slice(-10),
          current: action.payload,
        },
      };

    default:
      return state;
  }
}
