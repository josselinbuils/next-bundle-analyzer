import { ClientState } from '../interfaces/ClientState';
import { ClientAction } from '../interfaces/ClientAction';

export function clientReducer(
  state: ClientState,
  action: ClientAction
): ClientState {
  switch (action.type) {
    case 'BackAction': {
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

    case 'SetActiveGroupAction':
      return { ...state, activeGroup: action.payload };

    case 'SetDataAction':
      return {
        ...state,
        data: {
          past: [...state.data.past, state.data.current].slice(-10),
          current: action.payload,
        },
      };

    case 'SetOverflewGroupAction':
      return { ...state, overflewGroup: action.payload };

    case 'SetSearchQueryAction':
      return { ...state, searchQuery: action.payload };

    case 'SetSidebarPinnedAction':
      return { ...state, sidebarPinned: action.payload };

    default:
      return state;
  }
}
