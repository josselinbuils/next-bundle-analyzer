import { ClientData, ClientState } from '../interfaces/ClientState';

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
    sidebarPinned: false,
  };
}
