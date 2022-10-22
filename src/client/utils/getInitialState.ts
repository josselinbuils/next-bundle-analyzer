import type { ClientData, ClientState } from '../interfaces/ClientState';
import { filterPageGroups } from './filterPageGroups';

export function getInitialState(data: ClientData): ClientState {
  return {
    activeGroup: undefined,
    data: {
      past: [],
      current: data,
    },
    hasFoundModules: false,
    isSearching: false,
    overflewGroup: undefined,
    searchQuery: '',
    selectedPageGroups: filterPageGroups(data.groups),
    sidebarPinned: false,
  };
}
