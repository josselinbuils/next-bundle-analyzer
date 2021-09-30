import { ClientGroup } from './ClientGroup';

export interface ClientData {
  groups: ClientGroup[];
}

export interface ClientState {
  activeGroup: ClientGroup | undefined;
  data: {
    past: ClientData[];
    current: ClientData;
  };
  hasFoundModules: boolean;
  isSearching: boolean;
  overflewGroup: ClientGroup | undefined;
  searchQuery: string;
  sidebarPinned: boolean;
}
