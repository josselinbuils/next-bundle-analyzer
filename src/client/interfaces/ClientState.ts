import { ClientGroup } from './ClientGroup';

export interface ClientData {
  groups: ClientGroup[];
}

export interface ClientState {
  activeGroup: ClientGroup | undefined;
  overflewGroup: ClientGroup | undefined;
  data: {
    past: ClientData[];
    current: ClientData;
  };
}
